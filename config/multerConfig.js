const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// database configuration
const mongoURI = require('../config/keys_dev').mongoURI;

// create mongoose connection
const CONNECTION = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init GFS
let gfs;
let gridFSBucket;

CONNECTION.once('open', () => {
  // Init stream
  gfs = Grid(CONNECTION.db, mongoose.mongo);
  gridFSBucket = new mongoose.mongo.GridFSBucket(CONNECTION.db, {
    bucketName: 'uploads',
  });
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) {
          return reject(err);
        }
        const fileName = buff.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const maxSize = 3 * 1000 * 1000;

//read and stream image for UI
const streamImage = (req, res) => {
  gfs.files.findOne({ filename: req.params.id }, (err, file) => {
    if (err) throw err;

    //check if files exist
    if (!file || file.length === 0) {
      errors.profileImage = 'No file exists';
      return res.status(404).json(errors);
    }

    //check contentType
    if (
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/jpg' ||
      file.contentType === 'image/png'
    ) {
      //read stream to browser
      const readStream = gridFSBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } else {
      errors.fileError = 'Not an image';
      return res.status(404).json(errors);
    }
  });
};

const upload = multer({ storage, limits: { fileSize: maxSize } });

module.exports = {
  upload,
  streamImage,
};
