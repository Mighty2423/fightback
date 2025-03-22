const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database connection
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'scam_reports'
};

async function connectDB() {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL');
    return connection;
}

// Route to submit a scam report
app.post('/report', async (req, res) => {
    const { company_name, job_details, description } = req.body;
    if (!company_name || !description) {
        return res.status(400).json({ error: 'Company name and description are required' });
    }
    
    try {
        const db = await connectDB();
        const [company] = await db.execute('INSERT INTO companies (name) VALUES (?) ON DUPLICATE KEY UPDATE name=name', [company_name]);
        const companyId = company.insertId || (await db.execute('SELECT id FROM companies WHERE name = ?', [company_name]))[0][0].id;
        await db.execute('INSERT INTO scams (company_id, job_details, description) VALUES (?, ?, ?)', [companyId, job_details, description]);
        res.status(201).json({ message: 'Scam report submitted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
