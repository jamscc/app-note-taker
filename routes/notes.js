const idGen = require('../helpers/idGen');
const dbPH = './db/db.json';
const fsP = require('fs').promises;
const notes = require('express').Router();

const { parse, stringify } = JSON;
function forReadData(notesRec) { return parse(notesRec) };
function forWriteData(notesRec) { return stringify(notesRec, null, 2) };

// for GET
async function getDataDB(req, res) {
    try {
        // read and parse        
        const notesEntries = forReadData(await fsP.readFile(dbPH));
        res.json(notesEntries);
    }
    catch {
        const type = req.method;
        res.json(`There was an error in connection with the ${type} request.`);
    }
}

// for POST
async function postDataDB(req, res) {
    try {
        let idArray = [];
        // read and parse
        let notesEntries = forReadData(await fsP.readFile(dbPH));
        let len = notesEntries.length;
        // array of existing ids
        for (let i = 0; i < len; i++) {
            idArray = [...idArray, notesEntries[i].id];
        };
        // generate id
        const id = idGen(idArray);
        const title = req.body.title;
        const text = req.body.text;

        // add the note and write
        notesEntries = [...notesEntries, { title, text, id }];
        fsP.writeFile(dbPH, forWriteData(notesEntries));
        len = notesEntries.length;
        const indexLen = (len - 1);
        const noteAdded = notesEntries[indexLen];
        res.json({ noteAdded });
    }
    catch {
        const type = req.method;
        res.json(`There was an error in connection with the ${type} request.`);
    }
}

// for DELETE
async function deleteDataDB(req, res) {
    try {
        // read and parse
        const notesEntries = forReadData(await fsP.readFile(dbPH));
        // for the remaining data
        let dataRemain = [];
        // for deleted data
        let dataDeleted = [];

        const len = notesEntries.length;
        for (let i = 0; i < len; i++) {
            let equal = (notesEntries[i].id == req.params.id);
            switch (true) {
                case (equal):
                    dataDeleted = [...dataDeleted, notesEntries[i]];
                    break;
                default:
                    dataRemain = [...dataRemain, notesEntries[i]];
            }
        };
        // write
        fsP.writeFile(dbPH, forWriteData(dataRemain));
        // deleted data
        res.json({ dataDeleted });
    }
    catch {
        const type = req.method;
        res.json(`There was an error in connection with the ${type} request.`);
    }
}

// get notes 
notes.get('/', (req, res) => { getDataDB(req, res); });

// post a note
notes.post('/', (req, res) => { postDataDB(req, res); });

// delete
notes.delete('/:id', (req, res) => { deleteDataDB(req, res); });

module.exports = notes;

// source / credits: edX Boot Camps LLC; Express.js; Node.js