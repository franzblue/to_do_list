console.log('hello from js');

$(document).ready(onReady);

function onReady() {
    console.log('hello from jq');
    getTasks();
    $('#submit').on('click', makeTask);
    $('#toDoList').on('click', '.deleteBtn', deleteTask);
    $('#toDoList').on('click', '.completeBtn', updateCompleted);
    
}

function getTasks(){
    console.log('in GET tasks');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response){
        console.log('response from GET server:', response);
        appendTasks(response);
    }).catch(function(error){
        console.log(error);
    });
}

// function to GET taks list and append it to DOM
function appendTasks(array) {
    console.log('in appendTasks');
    let el = $('#toDoList');
    el.empty();
    for (let i = 0; i < array.length; i++) {
        // if(${array[i].id} === true){ toggle.class ???}
        // you can add a second data table effect if completed
        el.append(`
            <tr data-id=${array[i].id}>
            <td>${array[i].task_name}</td>
            <td></td>
            <td><button type="submit" class="deleteBtn">Delete</button></td>
            <td><button type="submit" class="completeBtn">Click when Completed</button></td>
            </tr>
            `);
    }
}

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
        getTasks();
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
        getTasks();
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
        getTasks();
    }).catch(function(error){
        console.log(error);
    });
}