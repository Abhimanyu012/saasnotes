const express = require('express');
const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/notesController');
const auth = require('../middleware/auth');
const tenantMw = require('../middleware/tenant');
const router = express.Router();

router.use(auth);
router.use(tenantMw);

// Create note
router.post('/', createNote);

// List notes
router.get('/', getNotes);

// Get note by id
router.get('/:id', getNoteById);

// Update note
router.put('/:id', updateNote);

// Delete note
router.delete('/:id', deleteNote);

module.exports = router;
