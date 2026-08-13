let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const taskCount = document.getElementById("taskCount");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  // if empty show error message
  if (taskText === "") {
    message.textContent = "Please enter a task.";
    message.style.color = "red";
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";

  // success message
  message.textContent = "Task added successfully!";
  message.style.color = "green";

  renderTasks();
});

// ==========================================
// RENDER TASKS
// ==========================================

function renderTasks() {
  // Clear existing tasks
  taskList.innerHTML = "";

 
  if (tasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No tasks available.";
    taskList.appendChild(emptyMessage);
    updateTaskCount();
    return;
  }


  tasks.forEach(function (task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");


    if (task.completed) {
      taskElement.classList.add("completed");
    }

    taskElement.innerHTML = `

      <div class="task-content">

        <input
          type="checkbox"
          class="task-checkbox"
          ${task.completed ? "checked" : ""}
        >

        <span class="task-text">
          ${task.text}
        </span>

      </div>

      <button class="delete-btn">
        Delete
      </button>

    `;

  
    const checkbox = taskElement.querySelector(".task-checkbox");
    const deleteButton = taskElement.querySelector(".delete-btn");

  
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;

      renderTasks();
    });

   
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    taskList.appendChild(taskElement);
  });

  // ==========================================
  // UPDATE TASK COUNT
  // ==========================================

  updateTaskCount();
}

// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  message.textContent = "Task deleted successfully!";
  message.style.color = "green";
  renderTasks();
}

// ==========================================
// UPDATE TASK COUNT
// ==========================================

function updateTaskCount() {
  const count = tasks.length;
  if (count === 0) {
    taskCount.textContent = "0 Tasks";
  } else if (count === 1) {
    taskCount.textContent = "1 Task";
  } else {
    taskCount.textContent = `${count} Tasks`;
  }
}

// ==========================================
// INPUT EVENT
// ==========================================

taskInput.addEventListener("input", function () {
  // Remove old error/success message
  message.textContent = "";
});

// ==========================================
// INITIAL RENDER
// ==========================================

renderTasks();
