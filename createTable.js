// createTable.js
const pool = require('./db');

const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS collections (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        creatorId BIGINT,
        creatorType VARCHAR(10) CHECK (creatorType IN ('admin', 'user')),
        title VARCHAR(100),
        description TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(query);
    console.log('Table "collections" created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    pool.end();
  }
};

createTable();
