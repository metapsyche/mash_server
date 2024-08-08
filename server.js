// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Make sure the path to db.js is correct

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create table routes

// Create a new artist
app.post('/artists', async (req, res) => {
  const { name, bio, profilePicture, walletAddress } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO artists (name, bio, profilePicture, walletAddress, createdAt) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, bio, profilePicture, walletAddress]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all artists
app.get('/artists', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artists');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an artist by ID
app.put('/artists/:id', async (req, res) => {
  const { id } = req.params;
  const { name, bio, profilePicture, walletAddress } = req.body;
  try {
    const result = await pool.query(
      'UPDATE artists SET name = $1, bio = $2, profilePicture = $3, walletAddress = $4 WHERE id = $5 RETURNING *',
      [name, bio, profilePicture, walletAddress, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an artist by ID
app.delete('/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM artists WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Repeat similar routes for the collections table

// Create a new collection
app.post('/collections', async (req, res) => {
  const { creatorId, creatorType, title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO collections (creatorId, creatorType, title, description, createdAt) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [creatorId, creatorType, title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all collections
app.get('/collections', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM collections');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a collection by ID
app.put('/collections/:id', async (req, res) => {
  const { id } = req.params;
  const { creatorId, creatorType, title, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE collections SET creatorId = $1, creatorType = $2, title = $3, description = $4 WHERE id = $5 RETURNING *',
      [creatorId, creatorType, title, description, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a collection by ID
app.delete('/collections/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM collections WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
