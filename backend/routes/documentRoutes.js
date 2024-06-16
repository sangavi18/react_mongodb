const express = require('express');
const multer = require('multer');
const path = require('path');
const documentController = require('../controllers/documentController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', documentController.getDocuments);
router.post('/upload', upload.single('file'), documentController.uploadDocument);
router.put('/:id', upload.single('file'), documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
