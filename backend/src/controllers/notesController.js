const Note = require('../models/Note');
const Tenant = require('../models/Tenant');

/**
 * Create a new note
 */
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const tenant = await Tenant.findById(req.tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const noteCount = await Note.countDocuments({ tenantId: req.tenantId });
    
    // Check plan limits
    if (tenant.plan === 'free' && noteCount >= 3) {
      return res.status(403).json({ 
        error: 'Note limit reached. Upgrade to Pro for unlimited notes.',
        limit: 3,
        current: noteCount
      });
    }

    const note = await Note.create({
      title,
      content,
      tenantId: req.tenantId,
      userId: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all notes for the current tenant
 */
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ tenantId: req.tenantId })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a specific note by ID
 */
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ 
      _id: req.params.id, 
      tenantId: req.tenantId 
    }).populate('userId', 'email');
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a note
 */
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      { title, content },
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a note
 */
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ 
      _id: req.params.id, 
      tenantId: req.tenantId 
    });
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};