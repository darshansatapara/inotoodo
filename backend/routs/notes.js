const mongoose = require("mongoose");
const { Schema } = mongoose;
const fatchuser = require("../middelware/fatchuser");
const Note = require("../models/Note");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Route1: Get all the note using : GET "/api/notes/getuser" , Login require.
router.get("/fatchallnotes", fatchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
});

//Route2: add new note using : post "/api/notes/addnote" , Login require.
router.post(
    "/addnote",
    fatchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "description must be  5 charactors").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //  if there is error we return bad error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savednote = await note.save();
            res.json(savednote);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal server error");
        }
    }
);

//Route3: update note using : put "/api/notes/updatenote" , Login require.
router.put("/updatenote/:id", fatchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create a new object
        const newNote={}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag }

        //find to be note updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found");}

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Found");}
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }



});
//Route4: delet note using : delet "/api/notes/deletnote" , Login require.
router.delete("/updatenote/:id", fatchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create a new object
        const newNote={}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag }

        //find to be note updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found");}

        //allow to deletion  only if user own
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Found");}
        note=await Note.findByIdAndDelete(req.params.id);
        res.json({"success":"Your note has been deleted.. " })
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }



});

module.exports = router;
