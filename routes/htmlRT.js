const path = require('path').join;
const pathDir = __dirname;
const pathPublic = `../public/`;
const fileNotes = `notes.html`;
const fileIndex = `index.html`;
const htmlRt = require('express').Router();

htmlRt.get('/notes', (req, res) => { res.sendFile(path(`${pathDir}`, `${pathPublic}`, `${fileNotes}`)) });
htmlRt.get('/', (req, res) => { res.sendFile(path(`${pathDir}`, `${pathPublic}`, `${fileIndex}`)) });

module.exports = htmlRt;

// source / credits: edX Boot Camps LLC; Express.js; Node.js