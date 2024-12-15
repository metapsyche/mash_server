const pool = require('./db');

const createTable = async () => {
  try {
//     {
//   "id": "1",
//   "name": "THISMINORITY",
//   "type": "musician artist",
//   "description": "THISMINORITY is a rising star in the indie rock scene, known for his electrifying performances and emotive songwriting. With a passion for crafting compelling melodies and thought-provoking lyrics, Mike has been making waves since his debut in 2020.",
//   "profilepicture": "https://mashlabsbucket.s3.us-east-1.amazonaws.com/THISMINORITY/THISMINORITY.jpg",
//   "walletaddress": "0x1234567890abcdef1234567890abcdef12345678",
//   "createdat": "2024-11-29T19:00:14.647Z",
//   "mashed_urls": [
//     "https://mashlabsbucket.s3.us-east-1.amazonaws.com/mashed/1733915906801_output.mp4",
//     "https://mashlabsbucket.s3.us-east-1.amazonaws.com/mashed/1733915875516_picture_audio_output.mp4"
//   ]
// }

    // Create artists table with a type field to distinguish between different types of artists
    const createArtistsTableQuery = `
      CREATE TABLE IF NOT EXISTS artists (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL, -- type of artist, e.g., 'tattoo artist', 'musician artist'
        description TEXT,
        profilePicture VARCHAR(255),
        walletAddress VARCHAR(42),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create solo_works table to store works of different artists with an optional song_url for musician artists
    // need to add video_urldown and 
  //    {
  //   "id": 16,
  //   "artist_id": "1",
  //   "type": "Song",
  //   "title": "Jungle",
  //   "file_name": "THISMINORITY",
  //   "song_url": "https://mashlabsbucket.s3.us-east-1.amazonaws.com/THISMINORITY/1-Jungle.mp3",
  //   "price": ".04 ETH (~$107)",
  //   "scarcity": "/ 100",
  //   "utility": "20% off live shows",
  //   "tags": [
  //     "HipHop",
  //     "indierap",
  //     "workout",
  //     "city"
  //   ],
  //   "geo": "NYC",
  //   "image_url": "https://mashlabsbucket.s3.us-east-1.amazonaws.com/THISMINORITY/1.Jungle.jpg",
  //   "created_at": "2024-12-03T18:34:30.060Z",
  //   "video_url": null
  // },
    const createSoloWorksTableQuery = `
      CREATE TABLE IF NOT EXISTS solo_works (
        id SERIAL PRIMARY KEY,
        artist_id BIGINT REFERENCES artists(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL, -- type of solo work, e.g., 'tattoo', 'music'
        title VARCHAR(100) NOT NULL,
        file_name VARCHAR(100) NOT NULL,
        song_url TEXT, -- only used for musician artists
        price VARCHAR(50) NOT NULL,
        scarcity VARCHAR(50) NOT NULL,
        utility TEXT NOT NULL,
        tags TEXT[] NOT NULL,
        geo VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createArtistsTableQuery);
    console.log('Table "artists" created successfully.');

    await pool.query(createSoloWorksTableQuery);
    console.log('Table "solo_works" created successfully.');

  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    pool.end();
  }
};

createTable();
