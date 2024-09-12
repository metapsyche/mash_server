

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Make sure the path to db.js is correct
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// const allowedOrigins = ['http://localhost', 'https://mashdevpreview.netlify.app', 'http://localhost:5173'];


// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies if needed 
// }));

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);  
  },
  credentials: true,  
}));



app.use(bodyParser.json());


// const pool = require('./db'); // Ensure the correct path

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Create a new artist with profile information
app.post('/artists', async (req, res) => {
  const { name, type, description, profilePicture, walletAddress } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO artists (name, type, description, profilePicture, walletAddress, createdAt) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [name, type, description, profilePicture, walletAddress]
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

// Get a specific artist by ID
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
  const { name, type, description, profilePicture, walletAddress } = req.body;
  try {
    const result = await pool.query(
      'UPDATE artists SET name = $1, type = $2, description = $3, profilePicture = $4, walletAddress = $5 WHERE id = $6 RETURNING *',
      [name, type, description, profilePicture, walletAddress, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an artist by ID
app.delete('/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM artists WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update an artist's profile picture and/or banner picture by ID
app.put('/artists/:id/pictures', async (req, res) => {
  const { id } = req.params;
  const { profilePicture, bannerPicture } = req.body;

  try {
    // First, check if the artist exists
    const artistResult = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
    if (artistResult.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    // Update profile picture and/or banner picture
    const result = await pool.query(
      `UPDATE artists 
       SET profilePicture = COALESCE($1, profilePicture), 
           bannerPicture = COALESCE($2, bannerPicture)
       WHERE id = $3 
       RETURNING *`,
      [profilePicture, bannerPicture, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});











// Create a new solo work for a specific artist
app.post('/artists/:artistId/solo-works', async (req, res) => {
  const { artistId } = req.params;
  const { type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO solo_works (artist_id, type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
       RETURNING *`,
      [artistId, type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all solo works for a specific artist
app.get('/artists/:artistId/solo-works', async (req, res) => {
  const { artistId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM solo_works WHERE artist_id = $1', [artistId]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific solo work by ID for a specific artist
app.get('/artists/:artistId/solo-works/:soloWorkId', async (req, res) => {
  const { artistId, soloWorkId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM solo_works WHERE artist_id = $1 AND id = $2', [artistId, soloWorkId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Solo work not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific solo work by ID for a specific artist
app.put('/artists/:artistId/solo-works/:soloWorkId', async (req, res) => {
  const { artistId, soloWorkId } = req.params;
  const { type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE solo_works 
       SET type = $1, title = $2, file_name = $3, song_url = $4, price = $5, scarcity = $6, utility = $7, tags = $8, geo = $9, image_url = $10 
       WHERE artist_id = $11 AND id = $12 
       RETURNING *`,
      [type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url, artistId, soloWorkId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Solo work not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific solo work by ID for a specific artist
app.delete('/artists/:artistId/solo-works/:soloWorkId', async (req, res) => {
  const { artistId, soloWorkId } = req.params;

  try {
    const result = await pool.query('DELETE FROM solo_works WHERE artist_id = $1 AND id = $2 RETURNING *', [artistId, soloWorkId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Solo work not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update a specific solo work's song_url by ID for a specific artist
app.put('/artists/:artistId/solo-works/:soloWorkId/song-url', async (req, res) => {
  const { artistId, soloWorkId } = req.params;
  const { song_url } = req.body;

  try {
    // First, check if the solo work exists
    const soloWorkResult = await pool.query('SELECT * FROM solo_works WHERE artist_id = $1 AND id = $2', [artistId, soloWorkId]);
    if (soloWorkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Solo work not found' });
    }

    // Check if song_url is already present
    const existingSongUrl = soloWorkResult.rows[0].song_url;

    if (existingSongUrl) {
      // If song_url exists, update it
      const updateResult = await pool.query(
        'UPDATE solo_works SET song_url = $1 WHERE artist_id = $2 AND id = $3 RETURNING *',
        [song_url, artistId, soloWorkId]
      );
      return res.status(200).json(updateResult.rows[0]);
    } else {
      // If song_url doesn't exist, add it
      const updateResult = await pool.query(
        'UPDATE solo_works SET song_url = $1 WHERE artist_id = $2 AND id = $3 RETURNING *',
        [song_url, artistId, soloWorkId]
      );
      return res.status(200).json(updateResult.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
















// Routes for Featured Content



// app.post('/artists/:artistId/featured-content', async (req, res) => {
//   const { artistId } = req.params;
//   const { type, creator, file_name, file, price, scarcity, utility, tags, geo } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO featured_content (type, creator, file_name, file, price, scarcity, utility, tags, geo, createdat, artistid) 
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10) 
//        RETURNING *`,
//       [type, creator, file_name, file, price, scarcity, utility, tags, geo, artistId]
//     );
    
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // Get all featured content for an artist
// app.get('/artists/:artistId/featured-content', async (req, res) => {
//   const { artistId } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM featured_content WHERE artistId = $1', [artistId]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// app.get('/artists/:artistId/new-releases', async (req, res) => {
//   const { artistId } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM new_releases WHERE artistId = $1', [artistId]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // Routes for New Releases

// // Add an item to new releases for an artist
// app.post('/artists/:artistId/new-releases', async (req, res) => {
//   const { artistId } = req.params;
//   const {
//     type,
//     creator,
//     file_name,
//     song_url,
//     price,
//     scarcity,
//     utility,
//     tags,
//     geo,
//     image_url,
//   } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO new_releases (type, creator, file_name, song_url, price, scarcity, utility, tags, geo, image_url, artistid, created_at) 
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) RETURNING *`,
//       [type, creator, file_name, song_url, price, scarcity, utility, tags, geo, image_url, artistId]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// // Get all new releases for an artist
// app.get('/artists/:artistId/new-releases', async (req, res) => {
//   const { artistId } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM new_releases WHERE artistId = $1', [artistId]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
