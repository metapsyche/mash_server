// insertData.js
const pool = require('./db');

const insertData = async () => {
  try {
    const query = `
      INSERT INTO collections (name, description, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *;
    `;
    const values = ['My First Collection', 'This is a description for the first collection.'];

    const res = await pool.query(query, values);
    console.log('Data inserted:', res.rows[0]);
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    pool.end();
  }
};

insertData();
