const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Require routes here
const taskRouter = require('./routes/task_router')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

//  App.use Routes go here
app.use('/tasks', taskRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port:', PORT);
});