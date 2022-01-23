const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const News = require('../models/News');
const { body, validationResult } = require('express-validator');
//Route 1:fetching all notes from login user /api/notes/fetchallnotes


router.get('/fetchallnotes', fetchuser, async(req, res) => {
    try {
        const notes = await News.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }
})

//Route 2:adding notes into current login user /api/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'please enter a valid description of min 5 characters').isLength({ min: 5 }),
    body('imageUrl', 'please enter a valid image url of min 5 characters').isLength({ min: 5 }),
    body('newsUrl', 'please enter a valid news url of min 5 characters').isLength({ min: 5 }),
    body('author', 'please enter a valid author name url of min 3 characters').isLength({ min: 3 }),
    body('source', 'please enter a valid sourec name url of min 3 characters').isLength({ min: 3 }),

], async(req, res) => {

    try {
        // if there is any error 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //  if there is no any error now use the desctructing concepyt of JS
        const { title, description, imageUrl, newsUrl, author, date, source } = req.body;

        const note = new News({
            title,
            description,
            imageUrl,
            newsUrl,
            author,
            date,
            source,
            user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }
})


//Route 4:deletng an existing notes into current login user /api/notes/deletenote
router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    //finding the notes to be deleetd and deleetd them too
    try {
        let note = await News.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        //checking is the user is authenticate or not "koi aur aka ni delete krde"!!
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowded")
        }
        note = await News.findOneAndDelete({ "_id": req.params.id })
        res.json({ note: note, "success": "Note has been deletd" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }

})
module.exports = router;