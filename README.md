# FightBack

## Overview
FightBack is a job scam awareness and tech consulting platform designed to help users identify fraudulent job postings, report scams, and access career guidance resources. This project integrates scam tracking with a consulting hub to provide insights on safe job searching, cybersecurity tips, and resume-building advice.

The platform is fully hosted on AWS and utilizes services such as Amazon EC2 (for backend hosting), RDS (for scam report storage), S3 (for frontend static site hosting), and CloudWatch for monitoring. IAM roles are used for secure access management.

FightBack aims to protect job seekers while offering expert-backed consulting on tech careers.

---

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (static hosted on Amazon S3)
- **Backend:** Node.js (Express.js) running in Docker on Amazon EC2
- **Database:** Amazon RDS (MySQL)
- **Storage:** Amazon S3 (for static assets)
- **Monitoring:** Amazon CloudWatch
- **Authentication & Access Control:** AWS IAM Roles
- **Containerization:** Docker & Docker Compose
- **CI/CD Pipeline:** GitHub Actions with remote EC2 SSH deployment + S3 sync

---

## Project Structure
```
fightback
├── .github
│   └── workflows
│       └── deploy.yml
├── backend
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── database
│   └── schema.sql
├── docker-compose.yml
├── frontend
│   ├── css
│   │   └── styles.css
│   ├── index.html
│   ├── js
│   │   ├── script.js
│   │   └── scam-reports.js
│   └── pages
│       ├── about.html
│       ├── report_scam.html
│       ├── scam_database.html
│       ├── resources.html
│       └── contact.html
└── README.md
```

---

## AWS Architecture

### Services Used:
- **Amazon EC2** — Hosts the Dockerized Node.js backend.
- **Amazon RDS** — MySQL database for storing scam reports.
- **Amazon S3** — Static site hosting for the frontend HTML/CSS/JS.
- **Amazon CloudWatch** — Application log monitoring.
- **AWS IAM Roles** — Secure access between EC2, RDS, S3.

### Flow:
1. Users interact with the **frontend** (S3 static site).
2. Frontend makes **CORS API requests** to the **backend** on EC2.
3. Backend connects to **Amazon RDS** to save and fetch scam data.
4. Admins view logs via **CloudWatch**.
5. Assets are deployed to S3 via GitHub Actions.

---

## Deployment

### Prerequisites:
- AWS account
- IAM roles & EC2 key pair set up
- GitHub secrets (SSH key, token, IP, bucket info)

### Steps:
1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/fightback.git
   cd fightback
   ```
2. Run locally with Docker:
   ```bash
   docker-compose up --build
   ```
3. Push to GitHub to trigger Actions deployment
   ```bash
   git add .
   git commit -m "Deploy update"
   git push origin main
   ```
4. GitHub workflow:
   - SSH into EC2
   - Pull latest changes
   - Rebuild Docker containers
   - Upload frontend to S3

---

## GitHub Actions Workflow
- `deploy.yml` handles:
  - Backend deployment via SSH to EC2
  - Frontend sync to S3 with `aws s3 sync`
  - `.env` usage and SSH key management
  - Docker Compose orchestration

---

## Future Features
- 🔍 **Searchable scam database** with filters and tags
- 🧠 **AI-based scam detection** engine (analyzing user reports)
- 🧰 **Admin dashboard** for managing submissions
- 📬 **Notification system** for scam alerts
- 🧾 **User authentication** and profile history

---

## Contributing
1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit and push: `git commit -m "Add feature"`
4. Open a pull request

---

## Contact
For inquiries or collaboration:
**Alton Sanford White V**
[Project Repository](https://github.com/Mighty2423/fightback)