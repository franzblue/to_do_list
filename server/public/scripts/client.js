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
}

function makeTask() {
    console.log('in addTask');
    let taskObject = {
        task: $('#toDoInput'),
        completed: false
    }
    $.ajax( {
        method: 'POST',
        url: '/tasks',
        data: taskObject
    }).then(function(response) {
        console.log('back from server with ', response);
    }).catch(function(error) {
        console.log('error', error);
    }).alert(error);
}