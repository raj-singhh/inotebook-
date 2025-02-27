const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//ROUTE 1: Get all the Notes using: GET "api/notes/fetchallnotes". Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});
//ROUTE 2: Get a new Notes using: POST "api/notes/addnote". Login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //Destructuring Concept
      const { title, description, tag } = req.body;
      // If there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error!" });
    }
  }
);

//ROUTE 3: Update an existing Note using: PUT "api/notes/updatenote". Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const newNote = {};
        if (title) {
          newNote.title = title;
        }
        if (description) {
          newNote.description = description;
        }
        if (tag) {
          newNote.tag = tag;
        }

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);

        //Check if the note to be updated exist...
        if (!note) {
          return res.status(404).send("Not Found");
        }

        //Allow updation only if User owns this note
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
        //Updating the notes
        note = await Notes.findByIdAndUpdate(
          req.params.id,
          { $set: newNote },
          { new: true }
        );
        res.json(note);
  } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

//ROUTE 4: Delete an existing Note using: DELETE "api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    //Find the note to be Deleted
    let note = await Notes.findById(req.params.id);

    //Check if the note to be deleted exist...
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion only if User owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

module.exports = router;
