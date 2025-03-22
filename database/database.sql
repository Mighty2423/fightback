CREATE DATABASE IF NOT EXISTS scam_reports;
USE scam_reports;

-- Table for scammer companies
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    aliases VARCHAR(255),  -- Shortened from TEXT for performance
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for scam reports
CREATE TABLE IF NOT EXISTS scams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    job_details VARCHAR(500),  -- Prevents unnecessary large text fields
    description TEXT NOT NULL,
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_company_id (company_id)  -- Optimizes queries by company
);

-- Table for scam tactics used
CREATE TABLE IF NOT EXISTS tactics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Linking table for scams and tactics (Many-to-Many)
CREATE TABLE IF NOT EXISTS scam_tactics (
    scam_id INT NOT NULL,
    tactic_id INT NOT NULL,
    PRIMARY KEY (scam_id, tactic_id),
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE,
    FOREIGN KEY (tactic_id) REFERENCES tactics(id) ON DELETE CASCADE,
    INDEX idx_scam_id (scam_id), 
    INDEX idx_tactic_id (tactic_id)
);

-- Table for contact information (emails, phone numbers, websites)
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scam_id INT NOT NULL,
    contact_type ENUM('email', 'phone', 'website') NOT NULL,
    contact_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE,
    UNIQUE (scam_id, contact_type, contact_value)  -- Prevents duplicate contacts
);

-- Table for evidence (file uploads)
CREATE TABLE IF NOT EXISTS evidence (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scam_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,  -- Ensure file path is relative
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE
);

-- Preload common scam tactics
INSERT INTO tactics (name) VALUES 
    ('Phishing'), 
    ('Malware'), 
    ('Fake Job Posting'), 
    ('Identity Theft'), 
    ('Other')
ON DUPLICATE KEY UPDATE name=name;  -- Prevent duplicate insertions
