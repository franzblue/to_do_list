// this stuff is the same for all route modules
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST
router.post('/', (req, res) => {
    console.log('in /tasks POST with:', req.body);
    let taskToAdd = req.body;
    const queryText = `INSERT INTO "tasks" ("task_name", "completed") 
                                VALUES ($1, $2);`;
    pool.query(queryText, [taskToAdd.task, taskToAdd.completed])
    .then((response) => {
        console.log('response from database', response);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST server', error);
        res.sendStatus(500);
    });
});

// GET


// DELETE


// PUT


//this is the same for all route modules
module.exports = router;