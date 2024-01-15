const express = require('express');
const router = express.Router();

const validate = require('../middleware/validate.js');

const db = require('../database.js');

// index
router.get('/', async (req, res) => {
    const conn = await db.getConnection();
    const query = `SELECT * FROM categories`;
    try {
        const results = await conn.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
        console.log(err);
    }
});

// create
router.post('/', validate.category, async (req, res) => {
    const { name } = req.body;
    const conn = await db.getConnection();
    const query = 'INSERT INTO categories (name) VALUES (?)';
    try {
        await conn.query(query, [name]);
        res.json({ message: 'Category created' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Category already exists' });
        }
        res.status(500).json({ error: 'Failed to create category' });
        console.log(err);
    }
});

// show
router.get('/:id', validate.id, async (req, res) => {
    const { id } = req.params;
    const conn = await db.getConnection();
    const query = `SELECT * FROM categories WHERE id = ?`;
    try {
        const results = await conn.query(query, [id]);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch category' });
        console.log(err);
    }
});

// update
router.put('/:id', validate.id, validate.category, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const conn = await db.getConnection();
    const query = `
    UPDATE categories
    SET name = ?
    WHERE id = ?`;
    try {
        await conn.query(query, [name, id]);
        res.json({ message: 'Category updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update category' });
        console.log(err);
    }
});

// get all reports in a certain category
router.get('/:id/reports', validate.id, async (req, res) => {
    const { id } = req.params;
    const conn = await db.getConnection();
    const query = `
    SELECT r.id, r.title, r.description, r.created_at
    FROM reports r
    INNER JOIN categories c
    ON r.category_id = c.id
    WHERE c.id = ?`;
    try {
        const results = await conn.query(query, [id]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reports' });
        console.log(err);
    }
});

module.exports = router;