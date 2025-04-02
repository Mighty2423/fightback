CREATE DATABASE IF NOT EXISTS scam_reports;
USE scam_reports;

-- Table for scammer companies
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for company aliases (instead of a single text field)
CREATE TABLE IF NOT EXISTS company_aliases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    alias_name VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_company_alias (company_id, alias_name)
);

-- Table for scam reports
CREATE TABLE IF NOT EXISTS scams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    job_details TEXT,  -- Allows more flexible job descriptions
    description TEXT NOT NULL,
    report_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending', -- For moderation
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_company_id (company_id)
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

-- Table for contact types
CREATE TABLE IF NOT EXISTS contact_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name ENUM('email', 'phone', 'website') NOT NULL UNIQUE
);

-- Table for scam contact information (emails, phone numbers, websites)
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scam_id INT NOT NULL,
    contact_type_id INT NOT NULL,
    contact_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE,
    FOREIGN KEY (contact_type_id) REFERENCES contact_types(id) ON DELETE CASCADE,
    UNIQUE (scam_id, contact_type_id, contact_value)
);

-- Table for evidence (file uploads)
CREATE TABLE IF NOT EXISTS evidence (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scam_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,  -- Ensure file path is relative
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE
);

-- Table for users (for authentication, if needed later)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Preload common scam tactics
INSERT INTO tactics (name) VALUES 
    ('Phishing'), 
    ('Malware'), 
    ('Fake Job Posting'), 
    ('Identity Theft'), 
    ('Other')
ON DUPLICATE KEY UPDATE name=name;

-- Preload contact types
INSERT INTO contact_types (type_name) VALUES ('email'), ('phone'), ('website')
ON DUPLICATE KEY UPDATE type_name=type_name;
