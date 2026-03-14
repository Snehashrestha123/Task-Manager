// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import NoteCard from "../../components/Cards/NoteCard";
// import { MdAdd } from "react-icons/md";
// import AddEditNotes from "./AddEditNotes";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Toast from "../../components/ToastMessage/Toast";

// Modal.setAppElement("#root");

// const Home = () => {
//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     message: "",
//     type: "add",
//   });

//   const [allNotes, setAllNotes] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token"); // JWT token

//   const showToastMessage = (message, type = "add") => {
//     setShowToastMsg({ isShown: true, message, type });
//   };

//   const handleCloseToast = () => {
//     setShowToastMsg({ isShown: false, message: "", type: "add" });
//   };

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete(`/delete-note/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       showToastMessage("Note deleted successfully", "success");
//       setAllNotes((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       console.error(err);
//       showToastMessage("Failed to delete note", "error");
//     }
//   };

//   const handlePin = async (note) => {
//     // Optimistic UI update
//     setAllNotes((prev) =>
//       prev.map((n) =>
//         n._id === note._id ? { ...n, isPinned: !n.isPinned } : n
//       )
//     );

//     try {
//       await axiosInstance.put(
//         `/update-note-pinned/${note._id}`, // your backend route
//         { isPinned: !note.isPinned },     // matches backend expected field
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       showToastMessage(!note.isPinned ? "Note pinned" : "Note unpinned", "success");
//     } catch (err) {
//       console.error("Pin error:", err.response || err);
//       showToastMessage("Failed to pin/unpin note", "error");
//       // Rollback UI
//       setAllNotes((prev) =>
//         prev.map((n) =>
//           n._id === note._id ? { ...n, isPinned: note.isPinned } : n
//         )
//       );
//     }
//   };

//   // Fetch user info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data?.user) setUserInfo(response.data.user);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Fetch all notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data?.notes) setAllNotes(response.data.notes);
//     } catch (err) {
//       console.log("Error fetching notes:", err);
//     }
//   };

//   useEffect(() => {
//     if (!token) navigate("/login");
//     else {
//       getUserInfo();
//       getAllNotes();
//     }
//   }, []);

//   return (
//     <>
//       <Navbar userInfo={userInfo} />

//       <div className="container mx-auto mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {allNotes
//             .sort((a, b) => (b.isPinned === a.isPinned ? 0 : b.isPinned ? -1 : 1)) // pinned notes on top
//             .map((note) => (
//               <NoteCard
//                 key={note._id}
//                 title={note.title}
//                 content={note.content}
//                 tags={note.tags || []}
//                 date={note.createdOn}
//                 isPinned={note.isPinned}
//                 onEdit={() => handleEdit(note)}
//                 onDelete={() => handleDelete(note._id)}
//                 onPinNote={() => handlePin(note)}
//               />
//             ))}
//         </div>
//       </div>

//       {/* Add Note Button */}
//       <button
//         className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
//         onClick={() =>
//           setOpenAddEditModal({ isShown: true, type: "add", data: null })
//         }
//       >
//         <MdAdd className="text-[32px] text-white" />
//       </button>

//       {/* Add/Edit Note Modal */}
//       <Modal
//         isOpen={openAddEditModal.isShown}
//         onRequestClose={() =>
//           setOpenAddEditModal({ isShown: false, type: "add", data: null })
//         }
//         style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
//         contentLabel="Add/Edit Note"
//         className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
//       >
//         <AddEditNotes
//           type={openAddEditModal.type}
//           noteData={openAddEditModal.data}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//           onClose={() =>
//             setOpenAddEditModal({ isShown: false, type: "add", data: null })
//           }
//         />
//       </Modal>

//       {/* Toast Message */}
//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />
//     </>
//   );
// };

// export default Home;






//another


import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";

Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // JWT token

  const showToastMessage = (message, type = "add") => {
    setShowToastMsg({ isShown: true, message, type });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "", type: "add" });
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/delete-note/${id}`);
      showToastMessage("Note deleted successfully", "success");
      setAllNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      showToastMessage("Failed to delete note", "error");
    }
  };

  const handlePin = async (note) => {
    setAllNotes((prev) =>
      prev.map((n) =>
        n._id === note._id ? { ...n, isPinned: !n.isPinned } : n
      )
    );

    try {
      await axiosInstance.put(`/update-note-pinned/${note._id}`, {
        isPinned: !note.isPinned,
      });
      showToastMessage(!note.isPinned ? "Note pinned" : "Note unpinned", "success");
    } catch (err) {
      console.error("Pin error:", err.response || err);
      showToastMessage("Failed to pin/unpin note", "error");
      setAllNotes((prev) =>
        prev.map((n) =>
          n._id === note._id ? { ...n, isPinned: note.isPinned } : n
        )
      );
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) setUserInfo(response.data.user);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data?.notes) setAllNotes(response.data.notes);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else {
      getUserInfo();
      getAllNotes();
    }
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allNotes
            .sort((a, b) => (b.isPinned === a.isPinned ? 0 : b.isPinned ? -1 : 1))
            .map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
                tags={note.tags || []}
                date={note.createdOn}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note._id)}
                onPinNote={() => handlePin(note)}
              />
            ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;