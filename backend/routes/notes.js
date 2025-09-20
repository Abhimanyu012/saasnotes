const express = require('express');
const Note = require('../models/Note');
const Tenant = require('../models/Tenant');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const tenantMw = require('../middleware/tenant');
const router = express.Router();

router.use(auth);
router.use(tenantMw);

// Create note
router.post('/', async (req, res) => {
  const tenant = await Tenant.findById(req.tenantId);
  const noteCount = await Note.countDocuments({ tenantId: req.tenantId });
  if (tenant.plan === 'free' && noteCount >= 3) {
    return res.status(403).json({ error: 'Note limit reached. Upgrade to Pro.' });
  }
  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    tenantId: req.tenantId,
    userId: req.user._id,
  });
  res.json(note);
});

// List notes
router.get('/', async (req, res) => {
  const notes = await Note.find({ tenantId: req.tenantId });
  res.json(notes);
});

// Get note by id
router.get('/:id', async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// Update note
router.put('/:id', async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenantId },
    { title: req.body.title, content: req.body.content },
    { new: true }
  );
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// Delete note
router.delete('/:id', async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json({ success: true });
});

module.exports = router;
