#!/usr/bin/env node

const ffmpeg = require('fluent-ffmpeg');
const express = require('express');
const cors = require('cors');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const DEBUG = (process.env.DEBUG || 'false').toLowerCase() === 'true';

const app = express();
app.use(cors());

app.get('*', (req, res) => {
  const { source: origImage, debug: showDebug = 'false' } = req.query || {};
  if (origImage) {
    const shouldShowDebug = DEBUG || showDebug.toLowerCase() === 'true';
    let startTime;
    if (shouldShowDebug) startTime = process.hrtime();
    res.contentType('image/webp');

    ffmpeg(origImage)
      .toFormat('webp')
      .outputOptions([
        '-q:v 70',
        '-lossless 0',
        '-loop 0',
      ])
      .on('end', err => {
        if (shouldShowDebug) {
          const end = process.hrtime(startTime);
          console.info(`Finished converting ${origImage}`);
          console.info('Execution time: %ds %dms', end[0], (end[1] / 1000000));
        }
        if (err) console.log(err);
      })
      .on('error', err => {
        console.error('conversion error:\n', err.message)
      })
      .pipe(res, { end: true, });
  }
});

app.listen(PORT, HOST, () => { console.log(`\nRunning on http://${HOST}:${PORT}\n`); });
