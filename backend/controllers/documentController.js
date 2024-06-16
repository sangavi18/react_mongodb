const Document = require('../models/document');

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
};

const uploadDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file.path;

    const newDocument = new Document({
      title,
      description,
      file,
    });

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading document' });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file ? req.file.path : undefined;

    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      { title, description, ...(file && { file }) },
      { new: true }
    );

    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document' });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document' });
  }
};

module.exports = {
  getDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,
};
