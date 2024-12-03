const ffmpeg = require('fluent-ffmpeg');
const fsPromises = require('fs').promises;
const path = require('path');

// Import paths for FFmpeg and FFprobe
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
 
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
 
const convertToMp3 = async (inputPath, outputPath) => {
    try {
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .output(outputPath)
                .on('end', resolve)
                .on('error', reject)
                .run();
        });
        console.log(`Conversion complete: ${outputPath}`);
    } catch (error) {
        console.error('Error during conversion:', error);
    }
};
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

const express = require('express');
const app = express();

app.use(express.json());

app.post('/convert', async (req, res) => {
    const { inputUrl } = req.body;

    if (!inputUrl) {
        return res.status(400).json({ error: 'Input URL is required' });
    }

    const outputFileName = `${Date.now()}_output.mp3`;
    const outputPath = path.join('outputs', outputFileName);

    try {
        // Ensure output directory exists
        await fsPromises.mkdir('outputs', { recursive: true });

        // Perform conversion
        await convertToMp3(inputUrl, outputPath);

        // Respond with success
        res.json({ message: 'Conversion successful', file: outputFileName });
    } catch (error) {
        res.status(500).json({ error: 'Conversion failed', details: error.message });
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
        // Ensure output directory exists
        await fsPromises.mkdir('outputs', { recursive: true });

        // Perform merge
        await mergeVideoAndAudio(videoUrl, audioUrl, outputPath);

        // Respond with success
        res.json({ message: 'Merge successful', file: outputFileName });
    } catch (error) {
        res.status(500).json({ error: 'Merge failed', details: error.message });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
