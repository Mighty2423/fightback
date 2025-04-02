const request = require('supertest');
const express = require('express');
const app = express();

// Mock middlewares and database
app.use(express.json());
app.get('/scams', (req, res) => {
    res.status(200).json([{ company_name: 'Test Co', job_details: 'Details', description: 'Desc' }]);
});

describe('GET /scams', () => {
    it('should return an array of scam reports', async () => {
        const res = await request(app).get('/scams');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty('company_name');
    });
});
