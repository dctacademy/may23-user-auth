const Note = require('../models/note-model')
const _ = require('lodash')
const { validationResult } = require('express-validator')
const notesCltr = {}

notesCltr.list = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId })
        res.json(notes)
    } catch(e) {
        res.json(e) 
    }
}

notesCltr.create = async (req, res) => {
    try {
        const errors = validationResult(req) 
        if(!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        } else {
            const body = _.pick(req.body, ['title', 'body'])
            const note = new Note(body) 
            note.userId = req.userId 
            await note.save()
            res.json(note)
        }
    } catch(e) {
        res.json(e) 
    }
}

// find single record
notesCltr.show = async (req, res) => {
    const id = req.params.id 
    try {
        const note = await Note.findOne({ _id: id, userId: req.userId })
        if(!note) {
            res.status(404).json({})
        } else {
            res.json(note)
        }
    } catch(e) {
        res.json(e) 
    }
}

// update record
notesCltr.update = async (req, res) => {
    const id = req.params.id 
    const body = req.body 
    try {
        const note = await Note.findOneAndUpdate({_id: id, userId: req.userId }, body, { new: true }) 
        if(!note) {
            res.status(404).json({})
        } else {
            res.json(note) 
        }
    } catch(e) {
        res.json(e) 
    }
}

// delete record 
notesCltr.destroy  = async (req,res) => {
    const id = req.params.id 
    try {
        const note = await Note.findOneAndDelete({ _id: id, userId: req.userId}) 
        if(!note) {
            res.status(404).json({})
        } else {
            res.json(note)
        }
    } catch(e) {
        res.json(e) 
    }
}


module.exports = notesCltr 