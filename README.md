# FightBack

## Overview
FightBack is a job scam awareness platform that helps users report fraudulent job postings and view a scam database. The project is hosted on AWS using Amazon RDS, S3, EC2, and IAM roles for secure access management.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Express.js)
- **Database:** Amazon RDS (MySQL/PostgreSQL)
- **Storage:** Amazon S3 (for uploaded evidence files)
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
│   ├── jobliers-api
│   │   ├── .env
│   │   ├── Dockerfile
│   │   └── server.js
│   └── nodejs (Not in use)
├── database
│   ├── database.sql
│   └── Dockerfile
├── docker-compose.yml
├── Dockerfile
├── frontend
│   ├── css
│   │   └── styles.css
│   ├── Dockerfile
│   ├── index.html
│   ├── js
│   │   └── script.js
│   └── pages
│       ├── about.html
│       ├── database.html
│       ├── report_scam.html
│       ├── reportscam.html
│       └── resources.html
└── README.md
```

---

## AWS Architecture

### Services Used:
- **Amazon EC2** – Hosts the backend Node.js API.
- **Amazon RDS** – Stores scam reports and user-submitted data.
- **Amazon S3** – Stores uploaded evidence files (images, documents, etc.).
- **AWS IAM Roles** – Manages access control for AWS services.
- **Amazon CloudWatch** – Monitors logs and application performance.

### Connection Flow:
1. **Frontend (HTML, CSS, JavaScript)** interacts with the backend via API requests.
2. **Backend (Node.js on EC2)** processes requests and interacts with RDS.
3. **Database (Amazon RDS)** stores scam reports and relevant data.
4. **S3 Bucket** is used to store uploaded evidence files securely.
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

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to GitHub: `git push origin feature-name`
5. Create a Pull Request!

---

## License
This project is licensed under the MIT License.

---

## Contact
For inquiries or contributions, contact **Alton Sanford White V**.

