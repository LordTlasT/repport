const express = require('express');
const router = express.Router();

const db = require('../database.js');

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

router.post('/', async (req, res) => {
    const { name } = req.body;
    console.log(name);
    const conn = await db.getConnection();
    const query = 'INSERT INTO categories (name) VALUES (?)';
    conn.query(query, [name]);
    res.json({ message: 'Category created' });
});

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

module.exports = router;