CREATE DATABASE scam_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scam_reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Can be NULL for anonymous reports
    scam_title VARCHAR(255) NOT NULL,
    scam_description TEXT NOT NULL,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL UNIQUE,
    is_scam BOOLEAN DEFAULT FALSE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scam_company_links (
    link_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    company_id INT NOT NULL,
    times_reported INT DEFAULT 1, 
    FOREIGN KEY (report_id) REFERENCES scam_reports(report_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE company_relationships (
    relationship_id INT AUTO_INCREMENT PRIMARY KEY,
    fake_company_id INT NOT NULL,
    real_scam_company_id INT NOT NULL,
    similarity_score FLOAT CHECK (similarity_score BETWEEN 0 AND 1), 
    FOREIGN KEY (fake_company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    FOREIGN KEY (real_scam_company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE contact_info (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    contact_type ENUM('email', 'phone', 'website', 'social_media') NOT NULL,
    contact_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (report_id) REFERENCES scam_reports(report_id) ON DELETE CASCADE
);

CREATE TABLE job_postings (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    job_title VARCHAR(255),
    salary_range VARCHAR(50),
    job_description TEXT,
    hiring_process TEXT, 
    FOREIGN KEY (report_id) REFERENCES scam_reports(report_id) ON DELETE CASCADE
);

CREATE TABLE report_similarity (
    similarity_id INT AUTO_INCREMENT PRIMARY KEY,
    report1_id INT NOT NULL,
    report2_id INT NOT NULL,
    similarity_score FLOAT CHECK (similarity_score BETWEEN 0 AND 1),
    FOREIGN KEY (report1_id) REFERENCES scam_reports(report_id) ON DELETE CASCADE,
    FOREIGN KEY (report2_id) REFERENCES scam_reports(report_id) ON DELETE CASCADE
);

CREATE TABLE user_votes (
    vote_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    user_id INT NOT NULL,
    vote_type ENUM('confirm', 'dispute') NOT NULL,
    FOREIGN KEY (report_id) REFERENCES scam_reports(report_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE malware_attacks (
    attack_id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    attack_type ENUM('trojan', 'keylogger', 'phishing', 'ransomware', 'spyware', 'other') NOT NULL,
    attack_description TEXT,
    FOREIGN KEY (report_id) REFERENCES scam_reports(report_id) ON DELETE CASCADE
);

CREATE TABLE historical_scams (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    previous_name VARCHAR(255),
    previous_contact VARCHAR(255),
    previous_attack_method TEXT,
    archived_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);
