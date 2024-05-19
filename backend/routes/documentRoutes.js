const express = require('express');
const multer = require('multer');
const {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getDocuments);
router.post('/', upload.single('file'), createDocument);
router.put('/:id', upload.single('file'), updateDocument); // Updated to handle file uploads
router.delete('/:id', deleteDocument);

module.exports = router;
