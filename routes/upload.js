const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET); 

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), (req, res, next) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Generates a unique file name by appending the current timestamp
    const timestamp = Date.now();
    const originalName = req.file.originalname;
    const uniqueFilename = `${timestamp}-${originalName}`;
  
    const blob = bucket.file(uniqueFilename);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
  
    blobStream.on('error', err => next(err));
  
    blobStream.on('finish', () => {
      // Constructs the public URL for the file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).send({ imageUrl: publicUrl });
    });
  
    blobStream.end(req.file.buffer);
  });
  

module.exports = router;
