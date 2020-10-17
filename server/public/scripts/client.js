console.log('hello from js');

$(document).ready(onReady);

function onReady() {
    console.log('hello from jq');
    $('#submit').on('click', makeTask);
    $('#toDoList').on('click', '.deleteBtn', deleteTask);
    $('#toDoList').on('click', '.completeBtn', updateCompleted);
    appendTasks();
}

// function to GET taks list and append it to DOM
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
                <tr data-id=${response[i].id}>
                <td>${response[i].task_name}</td>
                <td></td>
                <td><button type="submit" class="deleteBtn">Delete</button></td>
                <td><button type="submit" class="completeBtn">Click when Completed</button></td>
                </tr>
                `);
    }
    }).catch(function(error) {
    console.log('error', error);
    res.sendStatus(500)
    });
        }
// I should seperate this function into two
// getTasks and appendTasks



// function to delete appended rows
function deleteTask() {
    console.log('clicked delete');
    let taskId = $(this).closest('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url:`/tasks/${taskId}`
    }).then(function(response){
        console.log(' delete server response', response);
        // append new task list
        appendTasks();
    }).catch(function(error){
        console.log(error);
    });
}

// function to bundle inputs into object
function makeTask() {
    // validation needed --- no blank inputs allowed
    console.log('in makeTask');
    let taskObject = {
        task_name: $('#toDoInput').val(),
        completed: false
    }
    console.log('taskObject is:', taskObject);
       addTask(taskObject);
}
 
// function to POST input object to server
function addTask(taskObject) {
    console.log('in addTask, sending to server:', taskObject);
    $.ajax( {
        method: 'POST',
        url: '/tasks',
        data: taskObject
    }).then(function(response) {
        console.log('back from server with ', response);
        appendTasks();
    }).catch(function(error) {
        console.log('error', error);
        alert('error');
});
}


function updateCompleted(){
    let id = $(this).closest('tr').data('id');
    console.log('in PUT request with:', id);

    $.ajax({
        method: 'PUT',
        url:`/tasks/completedYet/${id}`,
        data: {completed: true}
    }).then(function(response){
        console.log(response);
        appendTasks();
    }).catch(function(error){
        console.log(error);
    });
}