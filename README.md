# FightBack

## Overview
FightBack is a job scam awareness and tech consulting platform designed to help users identify fraudulent job postings, report scams, and access career guidance resources. This project integrates scam tracking with a consulting hub to provide insights on safe job searching, cybersecurity tips, and resume-building advice.

The platform is hosted on AWS and utilizes services such as Amazon RDS, S3, EC2, and IAM roles for secure access management. FightBack aims to protect job seekers while offering expert-backed consulting on tech careers.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Express.js)
- **Database:** Amazon RDS (MySQL/PostgreSQL)
- **Storage:** Amazon S3 (for uploaded evidence files and consulting resources)
- **Monitoring:** Amazon CloudWatch
- **Authentication & Access Control:** AWS IAM Roles
- **Containerization:** Docker & Docker Compose
- **Version Control & CI/CD:** GitHub Actions & AWS CodeDeploy

---

## Project Structure
```
C:\Users\alton\source\fightback
├── .github
│   └── workflows
│       └── static.yml
├── backend
│   ├── api
│   │   ├── .env
│   │   ├── Dockerfile
│   │   └── server.js
│   ├── services
│   │   ├── scam-tracker.js
│   │   ├── consulting-hub.js
│   │   └── database.js
│   └── nodejs (Not in use)
├── database
│   ├── schema.sql  # Updated database schema for scams & consulting hub
│   └── Dockerfile
├── docker-compose.yml
├── frontend
│   ├── css
│   │   └── styles.css
│   ├── Dockerfile

│   ├── js
│   │   ├── scam-reports.js  # Fetch and display scam reports
│   │   ├── consulting.js  # Fetch and display consulting content
│   │   └── script.js
│   ├── index.html
│   ├── about.html
│   ├── report_scam.html
│   ├── consulting_hub.html
│   ├── resources.html
│   ├── scam_database.html
│   └── contact.html
└── README.md
```

---

## AWS Architecture

### Services Used:
- **Amazon EC2** – Hosts the backend Node.js API.
- **Amazon RDS** – Stores scam reports, consulting resources, and user data.
- **Amazon S3** – Stores uploaded evidence files (images, documents) and consulting content.
- **AWS IAM Roles** – Manages secure access to AWS services.
- **Amazon CloudWatch** – Monitors logs and application performance.

### Connection Flow:
1. **Frontend (HTML, CSS, JavaScript)** interacts with the backend via API requests.
2. **Backend (Node.js on EC2)** processes requests and interacts with RDS.
3. **Database (Amazon RDS)** stores scam reports, consulting resources, and user-generated content.
4. **S3 Bucket** stores scam evidence and consulting materials securely.
5. **IAM Roles** ensure secure access between AWS services.
6. **CloudWatch** provides monitoring and logging.

---

## Deployment
### Prerequisites
- AWS CLI installed and configured
- Docker installed
- GitHub repository (FightBack) set up
- GitHub Actions for CI/CD

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/fightback.git
   cd fightback
   ```
2. **Set up AWS services (IAM, EC2, RDS, S3, CloudWatch)**
3. **Build and run Docker containers locally:**
   ```sh
   docker-compose up --build
   ```
4. **Push to GitHub to trigger CI/CD pipeline:**
   ```sh
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```
5. **GitHub Actions deploys to AWS (EC2, RDS setup included in script)**

---

## GitHub Actions Workflow
- The `.github/workflows/static.yml` file automates the deployment process:
  - **Builds** and **tests** the Node.js backend.
  - **Pushes Docker images** to Amazon ECR.
  - **Deploys to EC2** using AWS CodeDeploy.
  - **Syncs files with S3** for static storage.

---

## Future Features
- **AI-powered scam detection** – Analyzing patterns in scam reports.
- **User authentication system** – Secure login for tracking submissions.
- **Automated job posting validation** – Flagging suspicious job listings.
- **Tech career insights & job market trends** – Data-driven job search recommendations.

---

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to GitHub: `git push origin feature-name`
5. Create a Pull Request!

---

## Contact
For inquiries or contributions, contact **Alton Sanford White V**.
