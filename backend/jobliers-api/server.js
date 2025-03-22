require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env' });

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mysecurepassword',
    database: process.env.DB_NAME || 'scam_reports',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.DB_SSL ? { rejectUnauthorized: true } : false // Use SSL if required by RDS
});

// Route to submit a scam report
app.post('/report', async (req, res) => {
    const { company_name, job_details, description } = req.body;
    if (!company_name || !description) {
        return res.status(400).json({ error: 'Company name and description are required' });
    }

    try {
        const db = await pool.getConnection();

        // Insert company or get existing ID
        await db.execute('INSERT IGNORE INTO companies (name) VALUES (?)', [company_name]);
        const [company] = await db.execute('SELECT id FROM companies WHERE name = ?', [company_name]);
        const companyId = company[0]?.id;

        // Insert scam report
        await db.execute(
            'INSERT INTO scams (company_id, job_details, description) VALUES (?, ?, ?)',
            [companyId, job_details, description]
        );

        db.release(); // Release connection back to pool
        res.status(201).json({ message: 'Scam report submitted' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
