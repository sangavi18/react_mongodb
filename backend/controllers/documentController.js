const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/documents.json');

const getDocuments = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    const documents = JSON.parse(data);
    res.status(200).json(documents);
  });
};

const createDocument = (req, res) => {
  const { title } = req.body;
  const file = req.file;

  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    const documents = JSON.parse(data);
    const newDocument = {
      id: Date.now().toString(),
      title,
      filePath: file.path,
      fileName: file.originalname,
    };
    documents.push(newDocument);

    fs.writeFile(filePath, JSON.stringify(documents, null, 2), (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json(newDocument);
    });
  });
};

const updateDocument = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const file = req.file;

  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    const documents = JSON.parse(data);
    const documentIndex = documents.findIndex((doc) => doc.id === id);
    if (documentIndex === -1) return res.status(404).json({ message: 'Document not found' });

    documents[documentIndex].title = title;
    if (file) {
      documents[documentIndex].filePath = file.path;
      documents[documentIndex].fileName = file.originalname;
    }

    fs.writeFile(filePath, JSON.stringify(documents, null, 2), (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(documents[documentIndex]);
    });
  });
};

const deleteDocument = (req, res) => {
  const { id } = req.params;

  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    const documents = JSON.parse(data);
    const updatedDocuments = documents.filter((doc) => doc.id !== id);

    fs.writeFile(filePath, JSON.stringify(updatedDocuments, null, 2), (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: 'Document deleted successfully' });
    });
  });
};

module.exports = { getDocuments, createDocument, updateDocument, deleteDocument };
