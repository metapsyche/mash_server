// createTable.js
const pool = require('./db');

const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS artists (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100),
        username VARCHAR(100),
        description TEXT,
        profilePicture VARCHAR(255),
        walletAddress VARCHAR(42),
        instagram VARCHAR(255),
        tiktok VARCHAR(255),
        twitter VARCHAR(255),
        website VARCHAR(255),
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

createTable();
