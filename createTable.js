// createTable.js
const pool = require('./db');

const createTable = async () => {
  try {
    // Create artists table
    const createArtistsTableQuery = `
      CREATE TABLE IF NOT EXISTS artists (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100),
        description TEXT,
        profilePicture VARCHAR(255),
        walletAddress VARCHAR(42), 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create new_releases table
    const createNewReleasesTableQuery = `
      CREATE TABLE IF NOT EXISTS new_releases (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        creator VARCHAR(100) NOT NULL,
        file_name VARCHAR(100) NOT NULL,
        song_url TEXT NOT NULL,
        price VARCHAR(50) NOT NULL,
        scarcity VARCHAR(50) NOT NULL,
        utility TEXT NOT NULL,
        tags TEXT[] NOT NULL,
        geo VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        artistId BIGINT REFERENCES artists(id) ON DELETE CASCADE
      );
    `;

    // Create featured_content table
    const createFeaturedContentTableQuery = `
      CREATE TABLE IF NOT EXISTS featured_content (
        id SERIAL PRIMARY KEY,
        type VARCHAR(100) NOT NULL,
        creator VARCHAR(100) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        scarcity VARCHAR(100) NOT NULL,
        utility TEXT,
        tags TEXT[],
        geo VARCHAR(255),
        createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        artistid BIGINT,
        FOREIGN KEY (artistid) REFERENCES artists(id) ON DELETE CASCADE
      );
    `;

    // Execute the queries
    await pool.query(createArtistsTableQuery);
    console.log('Table "artists" created successfully.');

    await pool.query(createNewReleasesTableQuery);
    console.log('Table "new_releases" created successfully.');

    await pool.query(createFeaturedContentTableQuery);
    console.log('Table "featured_content" created successfully.');
    
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    pool.end();
  }
};

createTable();
