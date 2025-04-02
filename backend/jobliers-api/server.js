require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env' });

const express = require('express');
const mysql = require('mysql2/promise');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

const app = express();
app.use(express.json());

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

// Database connection pool with error handling
let pool;
(async () => {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'mysecurepassword',
            database: process.env.DB_NAME || 'scam_reports',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            ssl: process.env.DB_SSL ? { rejectUnauthorized: true } : false
        });
        logger.info('Database pool created successfully');
    } catch (error) {
        logger.error(`Database connection error: ${error.message}`);
        process.exit(1); // Exit process if database connection fails
    }
})();

// Route to submit a scam report
app.post('/report', [
    body('company_name').notEmpty().withMessage('Company name is required'),
    body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { company_name, job_details, description } = req.body;

    try {
        const db = await pool.getConnection();
        await db.beginTransaction();

        // Insert company or get existing ID
        await db.execute('INSERT IGNORE INTO companies (name) VALUES (?)', [company_name]);
        const [company] = await db.execute('SELECT id FROM companies WHERE name = ?', [company_name]);
        const companyId = company[0]?.id;

        // Insert scam report
        await db.execute(
            'INSERT INTO scams (company_id, job_details, description) VALUES (?, ?, ?)',
            [companyId, job_details, description]
        );

        await db.commit();
        db.release();

        logger.info(`Scam report submitted for company: ${company_name}`);
        res.status(201).json({ message: 'Scam report submitted' });
    } catch (error) {
        logger.error(`Database error: ${error.message}`);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
