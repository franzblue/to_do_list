console.log('hello from js');

$(document).ready(onReady);

function onReady() {
    console.log('hello from jq');
    // fire off function to GET tasks from database and append them to the DOM
    getTasks();
    // event listeners
    $('#submit').on('click', makeTask);
    $('#toDoList').on('click', '.deleteBtn', deleteTask);
    $('#toDoList').on('click', '.completeBtn', updateCompleted);
}



// function to POST input object to server
function addTask(taskObject) {
    console.log('in addTask, sending to server: ', taskObject);
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

// append to DOM
function appendTasks(array) {
    console.log('in appendTasks', array);
    let el = $('#toDoList');
    el.empty();
    for (let i = 0; i < array.length; i++) {
        // this if statement checks if the task is completed
        // if true, whole row has green background
        if(array[i].completed === true) {
            el.append(`
                <tr  class="completed" data-id=${array[i].id}>
                <td>${array[i].task_name}</td>
                <td>Completed!</td>
                <td><button type="submit" class="deleteBtn">Delete</button></td>
                <td><button type="submit" class="completeBtn">Click when Completed</button></td>
                </tr>
            `)
        }
        else {
            // this section for rows of tasks not yet completed
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
}

// function to delete rows
function deleteTask() {
    // sweet alert verifying if user really wants to delete task
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not accomplish this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your task has been deleted!", {
            icon: "info",
          });
            let taskId = $(this).closest('tr').data('id');
            console.log('clicked delete on row id: ', taskId);
            // DELETE request
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
        } else {
          swal("Your task is safe, now get to work!");
        }
      });
}

// function to GET task list from databse
function getTasks(){
    console.log('in GET tasks');
    // GET tasks list
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response){
        console.log('response from GET server:', response);
        // append list to DOM
        appendTasks(response);
    }).catch(function(error){
        console.log(error);
    });
}

// function to bundle inputs into object
function makeTask() {
    if($('#toDoInput').val() === '' || $('#toDoInput').val() === 0 || $('#toDoInput').val() === null) {
        console.log('toDoInput field empty');
        alert('Input field is empty')
        return;
    }
    else {
            console.log('in makeTask');
    // bundle input field into an object
    let taskObject = {
        task_name: $('#toDoInput').val(),
        completed: false
    }
    console.log('taskObject is:', taskObject);
    // clear input field
    $('#toDoInput').val('');
    // feed taskObject into database
    addTask(taskObject);
    }
}

// click event to change task to completed = true
function updateCompleted(){
    // sweetalert succes!
    swal("Good job!", "You completed a task!", "success");
    let id = $(this).closest('tr').data('id');
    console.log('in PUT request with:', id);
    $.ajax({
        method: 'PUT',
        url:`/tasks/completedYet/${id}`,
        data: {completed: true}
    }).then(function(response){
        console.log(response);
        // fire function to GET tasks and append updates
        getTasks();
    }).catch(function(error){
        console.log(error);
    });
}