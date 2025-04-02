require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env' });

const express = require('express');
const mysql = require('mysql2/promise');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const winston = require('winston');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://fightback-frontend.s3-website-us-east-1.amazonaws.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// ... rest of your code



// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

// Database connection pool
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
        process.exit(1);
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

    let db;
    try {
        db = await pool.getConnection();
        await db.beginTransaction();

        await db.execute('INSERT IGNORE INTO companies (name) VALUES (?)', [company_name]);
        const [company] = await db.execute('SELECT id FROM companies WHERE name = ?', [company_name]);
        const companyId = company[0]?.id;

        await db.execute(
            'INSERT INTO scams (company_id, job_details, description) VALUES (?, ?, ?)',
            [companyId, job_details, description]
        );

        await db.commit();
        logger.info(`Scam report submitted for company: ${company_name}`);
        res.status(201).json({ message: 'Scam report submitted' });
    } catch (error) {
        logger.error(`Database error: ${error.message}`);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET all scam reports (optional search)
app.get('/scams', async (req, res) => {
    const search = req.query.search || '';
    let db;
    try {
        db = await pool.getConnection();
        const [results] = await db.execute(`
      SELECT c.name AS company_name, s.job_details, s.description
      FROM scams s
      JOIN companies c ON s.company_id = c.id
      WHERE c.name LIKE ?
      ORDER BY s.id DESC
    `, [`%${search}%`]);

        res.json(results);
    } catch (err) {
        logger.error(`GET /scams failed: ${err.message}`);
        res.status(500).json({ error: 'Failed to fetch scam reports' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
