const notesRoutes = require('./routes/notes');
const htmlRoutes = require('./routes/htmlRT');
const express = require('express');
const urlParse = express.urlencoded({ extended: true });
const jsonParse = express.json();
const staticPublic = express.static('public');
const ntApp = express();
const port = process.env.PORT || 3001;

ntApp.use(urlParse);
ntApp.use(jsonParse);
ntApp.use('/api/notes', notesRoutes);
ntApp.use(staticPublic);
ntApp.use('/', htmlRoutes);
ntApp.use('*', htmlRoutes);

ntApp.listen(port, () => { console.info("http://localhost:" + port) });

// source / credits: edX Boot Camps LLC; Express.js; Node.js