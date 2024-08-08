// insertArtistData.js
const pool = require('./db');

const insertArtistData = async () => {
  try {
    const query = `
      INSERT INTO artists (name, bio, profilePicture, walletAddress, createdAt)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const values = [
      'John Doe',
      'A talented artist known for his eclectic style.',
      'https://example.com/profile.jpg',
      '0x1234567890abcdef1234567890abcdef12345678'
    ];

    const res = await pool.query(query, values);
    console.log('Artist data inserted:', res.rows[0]);
  } catch (err) {
    console.error('Error inserting artist data:', err);
  } finally {
    pool.end();
  }
};

insertArtistData();
