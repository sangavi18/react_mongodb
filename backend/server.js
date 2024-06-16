const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const documentRoutes = require('./routes/documentRoutes');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('MONGO_URI is not defined in the .env file');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api/documents', documentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
