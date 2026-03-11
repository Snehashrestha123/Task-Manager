import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  // Fetch all notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/notes"); // adjust backend URL
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, []);

  // Delete note
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(notes.filter((note) => note._id !== id));
        alert("Note deleted successfully");
      } else {
        alert(data.message || "Failed to delete note");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting note");
    }
  };

  // Placeholder handlers for edit and pin
  const handleEdit = (id) => {
    console.log("Edit note", id);
  };
  const handlePin = (id) => {
    console.log("Pin note", id);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          {...note}
          onDelete={handleDelete}
          onEdit={() => handleEdit(note._id)}
          onPinNote={() => handlePin(note._id)}
        />
      ))}
    </div>
  );
};

export default NotesList;