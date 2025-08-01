import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);

  const createNote = async () => {
    const res = await axios.post('/api/notes', form);
    setNotes([...notes, res.data]);
    setForm({ title: '', content: '' });
  };

  const deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Note App</h2>
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      />
      <button onClick={createNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <b>{note.title}</b>: {note.content}
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

