import { useState, useEffect } from "react";
import noteServices from "../services/note";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ text: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await noteServices.findAll();
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await noteServices.create(note);
      const newNote = res.data;
      setNotes([...notes, newNote]);
      setNote({ text: "" });
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await noteServices.delete(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 w-fit">
      <div className="mb-6 flex gap-x-2 items-center">
        <input
          type="text"
          name="text"
          value={note.text}
          id="text"
          placeholder="Lorem ipsum..."
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm w-fit p-2.5 text-center"
        >
          Submit
        </button>
      </div>
      <div>
        <h2>Notes</h2>
        <ul className="list-disc ml-5">
          {notes.map((note) => (
            <li key={note.id} className="flex justify-between items-center">
              <span>{note.text}</span>
              <button
                onClick={() => handleDelete(note.id)}
                className="ml-4 text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Note;
