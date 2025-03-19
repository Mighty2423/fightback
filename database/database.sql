CREATE DATABASE scam_reports;
USE scam_reports;

-- Table for scammer companies
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    aliases TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for scam reports
CREATE TABLE scams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    job_details TEXT,
    description TEXT NOT NULL,
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Table for scam tactics used
CREATE TABLE tactics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Linking table for scams and tactics (Many-to-Many)
CREATE TABLE scam_tactics (
    scam_id INT,
    tactic_id INT,
    PRIMARY KEY (scam_id, tactic_id),
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE,
    FOREIGN KEY (tactic_id) REFERENCES tactics(id) ON DELETE CASCADE
);

-- Table for contact information (emails, phone numbers, websites)
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scam_id INT,
    contact_type ENUM('email', 'phone', 'website') NOT NULL,
    contact_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE
);

-- Table for evidence (file uploads)
CREATE TABLE evidence (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scam_id INT,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scam_id) REFERENCES scams(id) ON DELETE CASCADE
);

-- Preload common scam tactics
INSERT INTO tactics (name) VALUES ('Phishing'), ('Malware'), ('Fake Job Posting'), ('Identity Theft'), ('Other');
