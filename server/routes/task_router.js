// this stuff is the same for all route modules
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST
router.post('/', (req, res) => {
    console.log('in /tasks POST with:', req.body);
    let newTask = req.body;
    console.log(newTask, newTask.task_name, newTask.completed);
    const queryText = `INSERT INTO "tasks"("task_name", "completed") 
                                VALUES($1, $2);`;
    pool.query(queryText, [newTask.task_name, newTask.completed])
    .then((response) => {
        console.log('response from database', response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in POST server', error);
        res.sendStatus(500);
    });
});

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "completed";';
    pool.query(queryText).then((result) => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting books', error);
      res.sendStatus(500);
    });
  });

// DELETE
router.delete('/:id', (req, res) => {
  let taskId = req.params.id;
  let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
  pool.query(queryText, [taskId]).then((result) => {
      console.log(result);
      res.sendStatus(200);
  }).catch((error) => {
      console.log('error in delete', error);
      res.sendStatus(500);
  });
});


// PUT


//this is the same for all route modules
module.exports = router;