// import React, { useState } from "react";
// import TagInput from "../../components/Input/TagInput";
// import { MdClose } from "react-icons/md";
// import axiosInstance from "../../utils/axiosInstance";

// const AddEditNotes = ({ noteData, type, onClose }) => {
//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);

//     const [error, setError] = useState(null);

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags,
//             });

//             if (response.data && response.data.note) {
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id
//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags,
//             });

//             if (response.data && response.data.note) {
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title");
//             return;
//         }

//         if (!content) {
//             setError("Please enter the content");
//             return;
//         }

//         setError("");

//         if (type === 'edit') {
//             editNote()
//         } else {
//             addNewNote()
//         }
//     };

//     return (
//         <div className="relative">
//             <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500" onClick={onClose}>
//                 <MdClose className="text-xl text-slate-400" />
//             </button>

//             {/* Title */}
//             <div className="flex flex-col gap-2">
//                 <label className="input-label">TITLE</label>
//                 <input
//                     type="text"
//                     className="text-2xl text-slate-950 outline-none"
//                     placeholder="Go To Gym At 5"
//                     value={title}
//                     onChange={({ target }) => setTitle(target.value)}
//                 />
//             </div>

//             {/* Content */}
//             <div className="flex flex-col gap-2 mt-4">
//                 <label className="input-label">CONTENT</label>
//                 <textarea
//                     className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
//                     placeholder="Content"
//                     rows={10}
//                     value={content}
//                     onChange={({ target }) => setContent(target.value)}
//                 />
//             </div>

//             {/* Tags */}
//             <div className="mt-3 flex flex-col gap-2">
//                 <label className="input-label">TAGS</label>
//                 <TagInput tags={tags} setTags={setTags} />
//             </div>

//             {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
//             <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
//                 {type === 'edit' ? 'UPDATE' : 'ADD'}
//             </button>
//         </div>
//     );
// };

// export default AddEditNotes;

import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axios from "axios";

const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  // States
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(Array.isArray(noteData?.tags) ? noteData.tags : []);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:8000"; // backend URL
  const token = localStorage.getItem("token"); // JWT token from login

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/add-note`,
        { title, content, tags },
        {
          headers: {
            Authorization: `Bearer ${token}`, // MUST send token
          },
        }
      );

      if (response.data?.note) {
        getAllNotes(); // refresh notes
        onClose();     // close modal
      }
    } catch (err) {
      console.log("Axios error:", err.response || err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData?._id;
    if (!noteId) return setError("Invalid note ID");

    try {
      const response = await axios.put(
        `${BASE_URL}/edit-note/${noteId}`,
        { title, content, tags },
        {
          headers: {
            Authorization: `Bearer ${token}`, // MUST send token
          },
        }
      );

      if (response.data?.note) {
        getAllNotes(); // refresh notes
        onClose();     // close modal
      }
    } catch (err) {
      console.log("Axios error:", err.response || err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  // Handle button click
  const handleAddNote = () => {
    if (!title) return setError("Please enter the title");
    if (!content) return setError("Please enter the content");
    setError("");

    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="relative p-4 bg-white rounded shadow-md">
      {/* Close Button */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none border-b border-slate-300"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-col gap-2">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Add / Update Button */}
      <button
        className="btn-primary font-medium mt-5 p-3 w-full"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;