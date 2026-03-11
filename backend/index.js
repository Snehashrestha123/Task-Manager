// require("dotenv").config();

// const config = require("./config.json");
// const mongoose = require("mongoose");

// mongoose.connect(config.connectionString);

// const User = require("./models/user.model");
// const Note = require("./models/note.model")

// const express = require("express");
// const cors = require("cors");

// const app = express();

// const jwt = require("jsonwebtoken");
// const { authenticateToken } = require("./utilities")

// app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.get("/", (req, res) => {
//   res.json({ data: "hello" });
// });



// //Create Account
// app.post("/create-account", async (req, res) => {
//   const { fullName, email, password } = req.body;
//   if (!fullName) { 
//     return res
//       .status(400)
//       .json({ error: true, message: "Full Name is required" });
//   }

//   if (!email) {
//     return res.status(400).json({ error: true, message: "Email is required" });
//   }

//   if (!password) {
//     return res
//       .status(400)
//       .json({ error: true, message: "Password is required" })
//   }

//   const isUser = await User.findOne({ email: email });

//   if (isUser) {
//     return res.json({
//       error: true,
//       message: "User already exist",
//     })
//   }

//   const user = new User({
//     fullName,
//     email,
//     password,
//   })
//   await user.save();

//   const accessToken = JsonWebTokenError.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "36000m",
//   })
//   return res.json({
//     error: false,
//     user,
//     accessToken,
//     message: "Registration Successful",
//   })
// })

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   if (!password) {
//     return res.status(400).json({ message: "Password is required" });
//   }

//   const userInfo = await User.findOne({ email: email });

//   if (!userInfo) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   if (userInfo.email == email && userInfo.password == password) {
//     const user = { user: userInfo };
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "36000m",
//     })
//     return res.json({
//       error: false,

//       message: "Login Successful",
//       email,
//       accessToken,
//     })
//   } else {
//     return res.status(400).json({
//       error: true,
//       message: "Invalid Credentials",
//     })
//   }
// })

// //Get USer
// app.get("/get-user", authenticateToken, async (req, res) => {
//   const { user } = req.user;

//   try {
//     const isUser = await User.findOne({ _id: user._id });

//     if (!isUser) {
//       return res
//         .status(401)
//         .json({ error: true, message: "User not found" });
//     }

//     return res.json({
//       error: false,
//       user: { 
//         fullName: isUser.fullName, 
//         email:isUser.email, 
//         _id: isUser._id, 
//         createdOn: isUser.createdOn },
//       message: "User retrieved successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });

// // Add Note
// app.post("/add-note", authenticateToken, async (req, res) => {
//   const { title, content, tags } = req.body;
//   const { user } = req.user;

//   if (!title) {
//     return res
//       .status(400)
//       .json({ error: true, message: "Title is required" });
//   }

//   if (!content) {
//     return res
//       .status(400)
//       .json({ error: true, message: "Content is required" });
//   }

//   try {
//     const note = new Note({
//       title,
//       content,
//       tags: tags || [],
//       userId: user._id,
//     });

//     await note.save();

//     return res.json({
//       error: false,
//       note,
//       message: "Note added successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });

// // Edit Note
// app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
//   const { noteId } = req.params;
//   const { title, content, tags, isPinned } = req.body;
//   const { user } = req.user;

//   if (!title && !content && !tags && isPinned === undefined) {
//     return res
//       .status(400)
//       .json({ error: true, message: "No changes provided" });
//   }

//   try {
//     const note = await Note.findOne({ _id: noteId, userId: user._id });

//     if (!note) {
//       return res
//         .status(404)
//         .json({ error: true, message: "Note not found" });
//     }

//     if (title) note.title = title;
//     if (content) note.content = content;
//     if (tags) note.tags = tags;
//     if (isPinned !== undefined) note.isPinned = isPinned;

//     await note.save();

//     return res.json({
//       error: false,
//       note,
//       message: "Note updated successfully",
//     });

//   } catch (err) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });

// //Get All Notes
// app.get("/get-all-notes", authenticateToken, async (req, res) => {
//   const user = req.user;

//   try {
//     const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

//     return res.json({
//       error: false,
//       notes,
//       message: "All notes retrieved successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });

// // Delete Note
// app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
//   const noteId = req.params.noteId;
//   const { user } = req.user;

//   try {
//     const note = await Note.findOne({ _id: noteId, userId: user._id });

//     if (!note) {
//       return res
//         .status(404)
//         .json({ error: true, message: "Note not found" });
//     }

//     await Note.deleteOne({ _id: noteId, userId: user._id });

//     return res.json({
//       error: false,
//       message: "Note deleted successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });

// // Update Note Pinned Status
// app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
//   const { noteId } = req.params;
//   const { isPinned } = req.body;
//   const { user } = req.user;

//   try {
//     const note = await Note.findOne({ _id: noteId, userId: user._id });

//     if (!note) {
//       return res
//         .status(404)
//         .json({ error: true, message: "Note not found" });
//     }

//     note.isPinned = isPinned;
//     await note.save();

//     return res.json({
//       error: false,
//       note,
//       message: "Note updated successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// });

// app.listen(8000);

// module.exports = app; 



// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
// Models
const User = require("./models/user.model");
const Note = require("./models/note.model");

// Utilities
const { authenticateToken } = require("./utilities");

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.json({ data: "Hello from Notes App Backend" });
});

// ------------------------- AUTH ROUTES -------------------------

// CREATE ACCOUNT
app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName) return res.status(400).json({ error: true, message: "Full Name is required" });
    if (!email) return res.status(400).json({ error: true, message: "Email is required" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ error: true, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    return res.json({ error: false, user, accessToken, message: "Registration Successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ error: true, message: "Email is required" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: true, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: true, message: "Invalid Credentials" });

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    return res.json({ error: false, message: "Login Successful", email, accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// GET USER INFO
app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: true, message: "User not found" });

    return res.json({
      error: false,
      user: { _id: user._id, fullName: user.fullName, email: user.email, createdOn: user.createdOn },
      message: "User retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// ------------------------- NOTES ROUTES -------------------------

// ADD NOTE
app.post("/add-note", authenticateToken, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.userId;

    if (!title) return res.status(400).json({ error: true, message: "Title is required" });
    if (!content) return res.status(400).json({ error: true, message: "Content is required" });

    const note = new Note({ title, content, tags: tags || [], userId });
    await note.save();

    return res.json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// EDIT NOTE
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const userId = req.user.userId;

    if (!title && !content && !tags && isPinned === undefined)
      return res.status(400).json({ error: true, message: "No changes provided" });

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();
    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// GET ALL NOTES
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });
    return res.json({ error: false, notes, message: "All notes retrieved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// DELETE NOTE
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.userId;

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    await Note.deleteOne({ _id: noteId, userId });
    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// UPDATE NOTE PINNED STATUS
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { isPinned } = req.body;
    const userId = req.user.userId;

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    note.isPinned = isPinned;
    await note.save();

    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// ------------------------- START SERVER -------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;