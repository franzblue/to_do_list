console.log('hello from js');

$(document).ready(onReady);

function onReady() {
    console.log('hello from jq');
    $('#submit').on('click', makeTask);
    appendTasks();
}

function appendTasks() {
    console.log('in appendTasks');
    let el = $('#toDoList');
    el.empty();
    $.ajax( {
        method: 'GET',
        url: '/tasks'
    }).then( function (response) {
        console.log('back from server with', response);
        for (let i = 0; i < response.length; i++) {
            el.append(`
                <li>Task: ${response[i].task_name}</li>
                `);
    }
    }).catch(function(error) {
    console.log('error', error);
    res.sendStatus(500)
    });
        } // end getKoalas

function makeTask() {
    console.log('in addTask');
    let taskObject = {
        task: $('#toDoInput').val(),
        completed: false
    }
    console.log(taskObject);
       addTask(taskObject);
}
 

function addTask(taskObject) {
    $.ajax( {
        method: 'POST',
        url: '/tasks',
        data: {taskObject}
    }).then(function(response) {
        console.log('back from server with ', response);
    }).catch(function(error) {
        console.log('error', error);
        alert('error');
});
}
