import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import api from '../lib/api';
import { getRole, getTenantSlug } from '../lib/auth';
import { useToast } from '../components/ToastProvider.jsx';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const role = getRole();
  const tenantSlug = getTenantSlug();
  const { notify } = useToast();

  const isAdmin = role === 'admin';

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await api.listNotes();
      setNotes(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createNote() {
    setCreating(true);
    try {
      const note = await api.createNote({ title, content });
      setNotes((n) => [note, ...n]);
      setTitle('');
      setContent('');
      notify('Note created', 'success');
    } catch (e) {
      // If free plan limit reached, surface upgrade suggestion
      setError(e.message);
    } finally {
      setCreating(false);
    }
  }

  async function updateNote(id, next) {
    const prev = notes;
    setNotes((n) => n.map((x) => (x._id === id ? { ...x, ...next } : x)));
    try {
      const saved = await api.updateNote(id, next);
      setNotes((n) => n.map((x) => (x._id === id ? saved : x)));
      notify('Saved', 'success');
    } catch (e) {
      setNotes(prev);
      notify(e.message, 'error');
    }
  }

  async function removeNote(id) {
    const prev = notes;
    setNotes((n) => n.filter((x) => x._id !== id));
    try {
      await api.deleteNote(id);
      notify('Deleted', 'success');
    } catch (e) {
      setNotes(prev);
      notify(e.message, 'error');
    }
  }

  async function upgrade() {
    try {
      await api.upgradeTenant(tenantSlug);
      notify('Upgraded to Pro', 'success');
      setError('');
    } catch (e) {
      notify(e.message, 'error');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-6xl w-full px-4 py-8 space-y-8">
        <section className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">📝 Your Notes</h1>
              <p className="text-slate-600">Create, edit, and manage your notes within your tenant.</p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
              📊 {notes.length} notes
            </div>
          </div>
          
          {error && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">⚠️</span>
                <div className="flex-1">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                  {error.toLowerCase().includes('limit') && isAdmin && (
                    <div className="mt-3">
                      <button className="btn btn-primary text-sm" onClick={upgrade}>
                        ⬆️ Upgrade to Pro
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">✨ Create New Note</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input 
                className="input" 
                value={title} 
                onChange={(e)=>setTitle(e.target.value)} 
                placeholder="Enter note title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <input 
                className="input" 
                value={content} 
                onChange={(e)=>setContent(e.target.value)} 
                placeholder="Enter note content..."
              />
            </div>
          </div>
          <div className="mt-4">
            <button 
              disabled={!title || !content || creating} 
              className="btn btn-primary" 
              onClick={createNote}
            >
              {creating ? '⏳ Creating…' : '➕ Add Note'}
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-slate-900">📋 Notes List</h2>
          {loading ? (
            <div className="card text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-300 rounded w-1/4 mx-auto"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto mt-2"></div>
              </div>
              <p className="text-slate-600 mt-2">Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="card text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No notes yet</h3>
              <p className="text-slate-600">Create your first note to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {notes.map((n) => (
                <NoteItem key={n._id} note={n} onSave={updateNote} onDelete={removeNote} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function NoteItem({ note, onSave, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      {edit ? (
        <div className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                className="input" 
                value={title} 
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Note title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <input 
                className="input" 
                value={content} 
                onChange={(e)=>setContent(e.target.value)}
                placeholder="Note content..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{note.title}</h3>
            <p className="text-gray-600 mb-2">{note.content}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>📅 {new Date(note.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>⏰ {new Date(note.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {edit ? (
            <>
              <button 
                className="btn btn-primary text-sm" 
                onClick={()=>{ onSave(note._id, { title, content }); setEdit(false); }}
              >
                💾 Save
              </button>
              <button 
                className="btn btn-secondary text-sm" 
                onClick={()=>{ setTitle(note.title); setContent(note.content); setEdit(false); }}
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-secondary text-sm" 
                onClick={()=>setEdit(true)}
              >
                ✏️ Edit
              </button>
              <button 
                className="btn btn-danger text-sm" 
                onClick={()=>{
                  if(confirm('Are you sure you want to delete this note?')) {
                    onDelete(note._id);
                  }
                }}
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
        {!edit && (
          <div className="text-xs text-slate-400">
            ID: {note._id.slice(-6)}
          </div>
        )}
      </div>
    </div>
  );
}
