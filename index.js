

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Make sure the path to db.js is correct
const cors = require('cors');  
const fs = require('fs');
const axios = require('axios'); // For downloading files
const ffmpeg = require('fluent-ffmpeg');
const fsPromises = require('fs').promises;
const path = require('path');
const { uploadVideo, getVideoUrl, deleteVideo } = require('./s3_video_management');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });  

// Import paths for FFmpeg and FFprobe
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
 
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
 
 
const mergeVideoAndAudio = async (videoPath, audioPath, outputPath) => {
    try {
        // Get video duration using ffprobe
        const getVideoDuration = () =>
            new Promise((resolve, reject) => {
                ffmpeg.ffprobe(videoPath, (err, metadata) => {
                    if (err) reject(err);
                    else resolve(metadata.format.duration);
                });
            });

        const videoDuration = await getVideoDuration();

        await new Promise((resolve, reject) => {
            ffmpeg()
                .input(videoPath)
                .videoCodec('copy') // Copy video codec (no re-encoding)
                .input(audioPath)
                .audioCodec('aac') // Encode audio to AAC format
                .outputOptions('-map 0:v:0') // Map video stream
                .outputOptions('-map 1:a:0') // Map audio stream
                .outputOptions(`-t ${videoDuration}`) // Trim audio to match video duration
                .outputOptions('-shortest') // Ensure output matches the shortest stream
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });

        console.log(`Merge complete: ${outputPath}`);
    } catch (error) {
        console.error('Error during merge:', error);
    }
};

const mergePictureAndAudio = async (imagePath, audioPath, outputPath) => {
    try {
        // Create a 30-second static video from the image
        await new Promise((resolve, reject) => {
            ffmpeg()
                .input(imagePath)
                .inputOptions('-loop 1') // Loop the input image
                .input(audioPath)
                .audioCodec('aac') // Encode audio to AAC format
                .outputOptions('-c:v libx264') // Video codec
                .outputOptions('-preset medium') // Encoding preset
                .outputOptions('-tune stillimage') // Optimize for still image
                .outputOptions('-crf 23') // Constant Rate Factor for quality
                .outputOptions('-shortest') // Ensure output matches the shortest stream
                .outputOptions('-t 30') // Force 30-second duration
                .outputOptions('-map 0:v') // Map video stream from image
                .outputOptions('-map 1:a') // Map audio stream
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });

        console.log(`Merge complete: ${outputPath}`);
    } catch (error) {
        console.error('Error during merge:', error);
        throw error;
    }
};

const mergeAndUploadVideoToS3 = async (videoUrl, audioUrl) => {
  const outputFileName = `${Date.now()}_video_audio_output.mp4`;
  const outputPath = path.join('outputs', outputFileName);
  const downloadsDir = 'downloads';
  const outputsDir = 'outputs';

  // Create necessary directories
  await fsPromises.mkdir(downloadsDir, { recursive: true });
  await fsPromises.mkdir(outputsDir, { recursive: true });

  const videoDownloadPath = path.join(downloadsDir, `${Date.now()}_video${path.extname(videoUrl)}`);
  const audioDownloadPath = path.join(downloadsDir, `${Date.now()}_audio${path.extname(audioUrl)}`);

  try {
    // Download video and audio
    await downloadFile(videoUrl, videoDownloadPath);
    await downloadFile(audioUrl, audioDownloadPath);

    // Merge video and audio
    await mergeVideoAndAudio(videoDownloadPath, audioDownloadPath, outputPath);

    // Upload to S3
    const key = `mashed/${outputFileName}`;
    const fileBuffer = await fsPromises.readFile(outputPath);
    await uploadVideo(bucketName, key, fileBuffer);

    // Clean up local files
    await Promise.all([
      fsPromises.unlink(videoDownloadPath),
      fsPromises.unlink(audioDownloadPath),
      fsPromises.unlink(outputPath),
    ]);

    console.log(`Uploaded to S3: ${key}`);
    return { key };
  } catch (error) {
    console.error('Error during merge and upload:', error);
    throw error;
  }
};



// Function to download files from URLs
const downloadFile = async (url, downloadPath) => {
  const response = await axios({
    method: 'get',
    url,
    responseType: 'stream',
  });
  const writer = fs.createWriteStream(downloadPath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

// Function to merge and upload to S3
const mergeAndUploadImgToS3 = async (imageUrl, audioUrl) => {
  const outputFileName = `${Date.now()}_picture_audio_output.mp4`;
  const outputPath = path.join('outputs', outputFileName);
  const downloadsDir = 'downloads';
  const outputsDir = 'outputs';

  // Create necessary directories
  await fsPromises.mkdir(downloadsDir, { recursive: true });
  await fsPromises.mkdir(outputsDir, { recursive: true });

  const imageDownloadPath = path.join(downloadsDir, `${Date.now()}_image${path.extname(imageUrl)}`);
  const audioDownloadPath = path.join(downloadsDir, `${Date.now()}_audio${path.extname(audioUrl)}`);

  try {
    // Download image and audio
    await downloadFile(imageUrl, imageDownloadPath);
    await downloadFile(audioUrl, audioDownloadPath);

    // Merge picture and audio
    await mergePictureAndAudio(imageDownloadPath, audioDownloadPath, outputPath);

    // Upload to S3
    const key = `mashed/${outputFileName}`;
    const fileBuffer = await fsPromises.readFile(outputPath);
    await uploadVideo(bucketName, key, fileBuffer);

    // Clean up local files
    await Promise.all([
      fsPromises.unlink(imageDownloadPath),
      fsPromises.unlink(audioDownloadPath),
      fsPromises.unlink(outputPath),
    ]);

    console.log(`Uploaded to S3: ${key}`);
    return { key };
  } catch (error) {
    console.error('Error during merge and upload:', error);
    throw error;
  }
};

const app = express();
const port = 3000;

 
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);  
  },
  credentials: true,  
}));



app.use(bodyParser.json());

 

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.get('/', (req, res) => {
  res.send('Hello mash backend');
});


const bucketName = process.env.AWS_BUCKET_NAME;

// Express API endpoint
app.post('/mergeimg', async (req, res) => {
  const { imageUrl, audioUrl } = req.body;

  if (!imageUrl || !audioUrl) {
    return res.status(400).json({ error: 'Both image and audio URLs are required' });
  }

  try {
    const { key } = await mergeAndUploadImgToS3(imageUrl, audioUrl);
    const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    res.status(200).json({ message: 'Merge and upload successful', url: publicUrl });
  } catch (error) {
    res.status(500).json({ error: 'Merge and upload failed', details: error.message });
  }
});

app.post('/mergevideo', async (req, res) => {
  const { videoUrl, audioUrl } = req.body;

  if (!videoUrl || !audioUrl) {
    return res.status(400).json({ error: 'Both video and audio URLs are required' });
  }

  try {
    // Generate unique output filename
    // const outputFileName = `${Date.now()}_output.mp4`;

    // Define the S3 upload key
    // const key = `mashed/${outputFileName}`;
 
    const { key }= await mergeAndUploadVideoToS3(videoUrl, audioUrl);
 
    // const publicUrl = await getVideoUrl(bucketName, key);
    const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    // Respond with the public URL
    res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error('Error in merge route:', error);
    res.status(500).json({ error: 'Merge or upload failed', details: error.message });
  }
});
 
app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const file = req.file;
        const key = `mashed/${file.originalname}`;

        const fileContent = fs.readFileSync(file.path);
        await uploadVideo(bucketName, key, fileContent);

        fs.unlinkSync(file.path);  

        res.status(200).json({ message: 'Video uploaded successfully', key });
    } catch (error) {
        console.error('Error in upload route:', error);
        res.status(500).json({ error: 'Failed to upload video' });
    }
});
 

app.get('/url', async (req, res) => {
    try {
        const { key } = req.query;
        if (!key) {
            return res.status(400).json({ error: 'Key is required' });
        }

        const url = await getVideoUrl(bucketName, key);
        res.status(200).json({ url });
    } catch (error) {
        console.error('Error in get URL route:', error);
        res.status(500).json({ error: 'Failed to get video URL' });
    }
});


app.delete('/delete', async (req, res) => {
    try {
        const { key } = req.body;
        if (!key) {
            return res.status(400).json({ error: 'Key is required' });
        }

        await deleteVideo(bucketName, key);
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error in delete route:', error);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

app.post('/merge-picture-audio', async (req, res) => {
    const { imageUrl, audioUrl } = req.body;

    if (!imageUrl || !audioUrl) {
        return res.status(400).json({ error: 'Both image and audio URLs are required' });
    }

    const outputFileName = `${Date.now()}_picture_audio_output.mp4`;
    const outputPath = path.join('outputs', outputFileName);

    try {
        // Ensure output directory exists
        await fsPromises.mkdir('outputs', { recursive: true });

        // Download image and audio files
        const imageDownloadPath = path.join('downloads', `${Date.now()}_image${path.extname(imageUrl)}`);
        const audioDownloadPath = path.join('downloads', `${Date.now()}_audio${path.extname(audioUrl)}`);

        // Ensure downloads directory exists
        await fsPromises.mkdir('downloads', { recursive: true });

        // Download image
        const imageResponse = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'stream'
        });
        const imageWriter = fs.createWriteStream(imageDownloadPath);
        imageResponse.data.pipe(imageWriter);
        await new Promise((resolve, reject) => {
            imageWriter.on('finish', resolve);
            imageWriter.on('error', reject);
        });

        // Download audio
        const audioResponse = await axios({
            method: 'get',
            url: audioUrl,
            responseType: 'stream'
        });
        const audioWriter = fs.createWriteStream(audioDownloadPath);
        audioResponse.data.pipe(audioWriter);
        await new Promise((resolve, reject) => {
            audioWriter.on('finish', resolve);
            audioWriter.on('error', reject);
        });

        // Perform merge
        await mergePictureAndAudio(imageDownloadPath, audioDownloadPath, outputPath);

        // Optional: Clean up downloaded files
        await Promise.all([
            fsPromises.unlink(imageDownloadPath),
            fsPromises.unlink(audioDownloadPath)
        ]);

        // Respond with success
        res.json({ 
            message: 'Merge successful', 
            file: outputFileName 
        });
    } catch (error) {
        console.error('Merge failed:', error);
        res.status(500).json({ 
            error: 'Merge failed', 
            details: error.message 
        });
    }
});

app.post('/merge', async (req, res) => {
    const { videoUrl, audioUrl } = req.body;

    if (!videoUrl || !audioUrl) {
        return res.status(400).json({ error: 'Both video and audio URLs are required' });
    }

    const outputFileName = `${Date.now()}_output.mp4`;
    const outputPath = path.join('outputs', outputFileName);

    try {
        
        await fsPromises.mkdir('outputs', { recursive: true });

        
        await mergeVideoAndAudio(videoUrl, audioUrl, outputPath);

        
        res.json({ message: 'Merge successful', file: outputFileName });
    } catch (error) {
        res.status(500).json({ error: 'Merge failed', details: error.message });
    }
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
  const { name, type, description, profilePicture, walletAddress, mashedUrls } = req.body;

  try {
    const result = await pool.query(
      'UPDATE artists SET name = $1, type = $2, description = $3, profilePicture = $4, walletAddress = $5, mashed_urls = $6 WHERE id = $7 RETURNING *',
      [name, type, description, profilePicture, walletAddress, mashedUrls, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add or update mashed_urls for an artist by ID
app.put('/artists/:id/mashed-urls', async (req, res) => {
  const { id } = req.params;
  const { mashedUrls } = req.body;

  try {
    // Fetch existing artist data
    const artistResult = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
    if (artistResult.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const existingMashedUrls = artistResult.rows[0].mashed_urls || [];
    const updatedMashedUrls = [...new Set([...existingMashedUrls, mashedUrls])]; // Ensure mashedUrls is added as a string

    const result = await pool.query(
      'UPDATE artists SET mashed_urls = $1 WHERE id = $2 RETURNING *',
      [updatedMashedUrls, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/artists/:id/mashed-urls', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT mashed_urls FROM artists WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json({ mashedUrls: result.rows[0].mashed_urls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Delete specific mashed_urls for an artist by ID
app.delete('/artists/:id/mashed-urls/:url', async (req, res) => {
  const { id, url } = req.params;

  try {
    const artistResult = await pool.query('SELECT mashed_urls FROM artists WHERE id = $1', [id]);
    if (artistResult.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const existingMashedUrls = artistResult.rows[0].mashed_urls || [];
    const updatedMashedUrls = existingMashedUrls.filter(m => m !== url);

    const result = await pool.query(
      'UPDATE artists SET mashed_urls = $1 WHERE id = $2 RETURNING *',
      [updatedMashedUrls, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all mashed_urls for an artist by ID
app.delete('/artists/:id/mashed-urls', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE artists SET mashed_urls = $1 WHERE id = $2 RETURNING *',
      [[], id]  // Set mashed_urls to empty array
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
    const result = await pool.query('DELETE FROM artists WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/artists/:id/pictures', async (req, res) => {
  const { id } = req.params;
  const { profilePicture, bannerPicture } = req.body;

  try {
    // First, check if the artist exists
    const artistResult = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
    if (artistResult.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    // Prepare the update fields, only include non-undefined values
    const updateFields = {};
    const values = [];

    if (profilePicture !== undefined) {
      updateFields.profilePicture = profilePicture;
      values.push(profilePicture);
    }

    if (bannerPicture !== undefined) {
      updateFields.bannerPicture = bannerPicture;
      values.push(bannerPicture);
    }

    // If no fields to update, return an error
    if (values.length === 0) {
      return res.status(400).json({ error: 'At least one picture must be provided' });
    }

    // Add the artist ID to the values array
    values.push(id);

    // Build the SQL query dynamically based on the fields to update
    let query = 'UPDATE artists SET ';
    const setClauses = [];
    if (updateFields.profilePicture) {
      setClauses.push('profilePicture = $' + (setClauses.length + 1));
    }
    if (updateFields.bannerPicture) {
      setClauses.push('bannerPicture = $' + (setClauses.length + 1));
    }
    query += setClauses.join(', ') + ' WHERE id = $' + (setClauses.length + 1) + ' RETURNING *';

    // Execute the query
    const result = await pool.query(query, values);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});












// Create a new solo work for a specific artist
// Create a new solo work for a specific artist
app.post('/artists/:artistId/solo-works', async (req, res) => {
  const { artistId } = req.params;
  const { type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url, video_url } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO solo_works (artist_id, type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url, video_url, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
       RETURNING *`,
      [artistId, type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url, video_url]
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
// Update a specific solo work by ID for a specific artist
app.put('/artists/:artistId/solo-works/:soloWorkId', async (req, res) => {
  const { artistId, soloWorkId } = req.params;
  const { type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url, video_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE solo_works 
       SET type = $1, title = $2, file_name = $3, song_url = $4, price = $5, scarcity = $6, utility = $7, tags = $8, geo = $9, image_url = $10, video_url = $11
       WHERE artist_id = $12 AND id = $13 
       RETURNING *`,
      [type, title, file_name, song_url, price, scarcity, utility, tags, geo, image_url, video_url, artistId, soloWorkId]
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

app.put('/artists/:artistId/solo-works/:soloWorkId/video-url', async (req, res) => {
  const { artistId, soloWorkId } = req.params;
  const { video_url } = req.body;

  try {
    // First, check if the solo work exists
    const soloWorkResult = await pool.query('SELECT * FROM solo_works WHERE artist_id = $1 AND id = $2', [artistId, soloWorkId]);
    if (soloWorkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Solo work not found' });
    }

    // Check if video_url is already present
    const existingVideoUrl = soloWorkResult.rows[0].video_url;

    if (existingVideoUrl) {
      // If video_url exists, update it
      const updateResult = await pool.query(
        'UPDATE solo_works SET video_url = $1 WHERE artist_id = $2 AND id = $3 RETURNING *',
        [video_url, artistId, soloWorkId]
      );
      return res.status(200).json(updateResult.rows[0]);
    } else {
      // If video_url doesn't exist, add it
      const updateResult = await pool.query(
        'UPDATE solo_works SET video_url = $1 WHERE artist_id = $2 AND id = $3 RETURNING *',
        [video_url, artistId, soloWorkId]
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
