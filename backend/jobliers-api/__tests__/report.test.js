const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/report', (req, res) => {
    const { company_name, description } = req.body;
    if (!company_name || !description) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    return res.status(201).json({ message: 'Scam report submitted' });
});

describe('POST /report', () => {
    it('should return 201 if data is valid', async () => {
        const res = await request(app)
            .post('/report')
            .send({ company_name: 'Test Co', description: 'Fake job offer' });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Scam report submitted');
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app).post('/report').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Missing fields');
    });
});
