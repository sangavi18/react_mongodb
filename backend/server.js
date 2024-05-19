const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/documents', documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
