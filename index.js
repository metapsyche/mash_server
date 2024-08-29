

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Make sure the path to db.js is correct
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

const allowedOrigins = ['http://localhost', 'https://mashdevpreview.netlify.app'];


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies if needed
}));


app.use(bodyParser.json());

// Create a new artist with profile information
  app.post('/artists', async (req, res) => {
    const { name, username, description, profilePicture, walletAddress, instagram, tiktok, twitter, website } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO artists (name, username, description, profilePicture, walletAddress, instagram, tiktok, twitter, website, createdAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *',
        [name, username, description, profilePicture, walletAddress, instagram, tiktok, twitter, website]
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


app.get('/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update an artist by ID
app.put('/artists/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, description, profilePicture, walletAddress, instagram, tiktok, twitter, website } = req.body;
  try {
    const result = await pool.query(
      'UPDATE artists SET name = $1, username = $2, description = $3, profilePicture = $4, walletAddress = $5, instagram = $6, tiktok = $7, twitter = $8, website = $9 WHERE id = $10 RETURNING *',
      [name, username, description, profilePicture, walletAddress, instagram, tiktok, twitter, website, id]
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

// Routes for Featured Content

// Add an item to featured content for an artist
app.post('/artists/:artistId/featured-content', async (req, res) => {
  const { artistId } = req.params;
  const { type, creator, file_name, file, price, scarcity, utility, tags, geo } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO featured_content (type, creator, file_name, file, price, scarcity, utility, tags, geo, createdat, artistid) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10) 
       RETURNING *`,
      [type, creator, file_name, file, price, scarcity, utility, tags, geo, artistId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all featured content for an artist
app.get('/artists/:artistId/new-releases', async (req, res) => {
  const { artistId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM new_releases WHERE artistId = $1', [artistId]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Routes for New Releases

// Add an item to new releases for an artist
app.post('/artists/:artistId/new-releases', async (req, res) => {
  const { artistId } = req.params;
  const {
    type,
    creator,
    file_name,
    song_url,
    price,
    scarcity,
    utility,
    tags,
    geo,
    image_url,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO new_releases (type, creator, file_name, song_url, price, scarcity, utility, tags, geo, image_url, artistid, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) RETURNING *`,
      [type, creator, file_name, song_url, price, scarcity, utility, tags, geo, image_url, artistId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get all new releases for an artist
app.get('/artists/:artistId/new-releases', async (req, res) => {
  const { artistId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM new_releases WHERE artistId = $1', [artistId]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
