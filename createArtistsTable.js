// createArtistsTable.js
const pool = require('./db');

const createArtistsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS artists (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100),
        bio TEXT,
        profilePicture VARCHAR(255),
        walletAddress VARCHAR(42),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(query);
    console.log('Table "artists" created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    pool.end();
  }
};

createArtistsTable();
