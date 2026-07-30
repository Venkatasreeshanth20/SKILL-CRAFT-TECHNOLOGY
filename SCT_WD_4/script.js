// Select Elements
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("taskDate");
const timeInput = document.getElementById("taskTime");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Load tasks when page opens
window.onload = function () {
    displayTasks();
    checkReminders();

    if ("Notification" in window) {
        Notification.requestPermission();
    }
};


// Add Task
addBtn.addEventListener("click", function () {

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        id: Date.now(),
        text: taskText,
        date: dateInput.value,
        time: timeInput.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

});


// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        let li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }


        li.innerHTML = `

            <div class="task-content">

                <h3>${task.text}</h3>

                <p>
                ${task.date ? task.date : ""}
                ${task.time ? " - " + task.time : ""}
                </p>

            </div>


            <div class="buttons">

                <button onclick="completeTask(${task.id})">
                    ✔
                </button>


                <button onclick="editTask(${task.id})">
                    ✏
                </button>


                <button onclick="deleteTask(${task.id})">
                    🗑
                </button>

            </div>

        `;


        taskList.appendChild(li);

    });

}


// Complete Task
function completeTask(id){

    tasks = tasks.map(function(task){

        if(task.id === id){

            task.completed = !task.completed;

        }

        return task;

    });


    saveTasks();
    displayTasks();

}



// Delete Task
function deleteTask(id){

    tasks = tasks.filter(function(task){

        return task.id !== id;

    });


    saveTasks();
    displayTasks();

}



// Edit Task
function editTask(id){

    let task = tasks.find(function(task){

        return task.id === id;

    });


    let updatedTask = prompt(
        "Edit your task:",
        task.text
    );


    if(updatedTask !== null && updatedTask.trim() !== ""){

        task.text = updatedTask;

        saveTasks();
        displayTasks();

    }

}



// Save Tasks
function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}



// Reminder Checking

function checkReminders(){

    setInterval(function(){

        let now = new Date();


        tasks.forEach(function(task){


            if(task.completed){
                return;
            }


            if(task.date && task.time){


                let taskDateTime = new Date(
                    task.date + " " + task.time
                );


                let difference =
                taskDateTime - now;



                // Reminder 1 minute before

                if(
                    difference > 0 &&
                    difference <= 60000
                ){

                    showNotification(task.text);

                }


            }


        });


    },10000);

}



// Browser Notification

function showNotification(message){


    if(Notification.permission === "granted"){

        new Notification(
            "Task Reminder 🔔",
            {
                body: message
            }
        );

    }


}