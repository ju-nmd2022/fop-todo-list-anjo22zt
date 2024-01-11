
let tasks = [];

function addTask() {
  const newTaskInput = document.getElementById("newTask");
  const task = newTaskInput.value.trim();
  
  if (task !== '') {
    tasks.push({ name: task, completed: false });
    saveTasks();
    renderTaskList();
    newTaskInput.value = '';
  }
}

function renderTaskList() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    if (!task.completed) {
      const taskElement = document.createElement("li");
      const label = document.createElement("label");

      label.appendChild(document.createTextNode(task.name));

      const markDoneButton = document.createElement("button");
      markDoneButton.innerText = "done";
      markDoneButton.addEventListener("click", () => {
        markTaskAsDone(index);
      });

      const markUndoneButton = document.createElement("button");
      markUndoneButton.innerText = "delete";
      markUndoneButton.addEventListener("click", () => {
        removeTask(index);
      });

      taskElement.appendChild(label);
      taskElement.appendChild(markDoneButton);
      taskElement.appendChild(markUndoneButton);
      taskListElement.appendChild(taskElement);
    } else {
      const label = document.createElement("label");
      label.appendChild(document.createTextNode(task.name));
      label.classList.add("completed");
      taskListElement.appendChild(label);
    }
  });

  updateTaskCount();
}

function markTaskAsDone(index) {
  tasks[index].completed = true;
  saveTasks();
  renderTaskList();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTaskList();
}

function updateTaskCount() {
  const taskCountElement = document.getElementById("taskCount");
  taskCountElement.textContent = tasks.length;
}

function saveTasks() {
  const remainingTasks = tasks.filter(task => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(remainingTasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
  renderTaskList();
}

document.getElementById('addButton').addEventListener('click', addTask);
window.onload = loadTasks;
