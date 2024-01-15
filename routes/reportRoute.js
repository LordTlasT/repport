const express = require('express');
const router = express.Router();

const db = require('../database.js');
const validate = require('../middleware/validate.js');

// index
router.get('/', async (req, res) => {
    const conn = await db.getConnection();
    const query = `SELECT * FROM reports`;
    try {
        results = await conn.query(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reports' });
        console.log(err);
    }
});

// create
router.post('/', validate.report, async (req, res) => {
    const { title, description, category_id } = req.body;
    const conn = await db.getConnection();
    const query = `
    INSERT INTO reports (title, description, category_id)
    VALUES (?, ?, ?) RETURNING ID`;
    try {
        await conn.query(query, [title, description || "", category_id]);
        res.json({ message: 'Report created' });
    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2')
            res.status(400).json({ error: 'Category does not exist' });
        else
            res.status(500).json({ error: 'Failed to create report' });
        console.log(err);
    }
});

// show
router.get('/:id', validate.id, async (req, res) => {
    const { id } = req.params;
    const conn = await db.getConnection();
    const query = `SELECT * FROM reports WHERE id = ?`;
    try {
        const results = await conn.query(query, [id]);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Report not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch report' });
        console.log(err);
    }
});

// update
router.put('/:id', validate.id, validate.report, async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id } = req.body;
    const conn = await db.getConnection();
    const query = `
    UPDATE reports
    SET title = ?, description = ?, category_id = ?
    WHERE id = ?`;
    try {
        results = await conn.query(query, [title, description || "", category_id, id]);
        if (results.affectedRows)
            res.json({ message: 'Report updated' });
        else
            res.status(404).json({ error: 'Report not found' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update report' });
        console.log(err);
    }
});

// delete
router.delete('/:id', validate.id, async (req, res) => {
    const { id } = req.params;
    const conn = await db.getConnection();
    const query = `DELETE FROM reports WHERE id = ?`;
    try {
        results = await conn.query(query, [id]);
        if (results.affectedRows)
            res.json({ message: 'Report deleted' });
        else
            res.status(404).json({ error: 'Report not found' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete report' });
        console.log(err);
    }
});

module.exports = router;