
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

const form = document.getElementById("taskForm");
const taskId = document.getElementById("taskId");
const nameInput = document.getElementById("taskName");
const dateInput = document.getElementById("taskdate");
const priorityInput = document.getElementById("priority");
const tbody = document.querySelector("#tasksTable tbody");

function saveToLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function resetForm() {
  form.reset();
  priorityInput.value = "";
}

function renderTable() {
  tbody.innerHTML = "";
  taskList.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.status}</td>
      <td>${task.name}</td>
      <td>${task.priority}</td>
      <td>${task.date}</td>
      <td class="actions">
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}



form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const priority = priorityInput.value;
  const date = dateInput.value;

  if (!name || !priority || !date) return alert("Please fill out all fields.");

  const id = taskId.value;

  if (id) {
    // Edit mode
    const index = taskList.findIndex((t) => t.id == id);
    taskList[index].name = name;
    taskList[index].priority = priority;
    taskList[index].date = date;
  } else {
    // Create new task
    taskList.push({
      id: Date.now(),
      name,
      priority,
      date,
      status: "Active"
    });
  }

  saveToLocalStorage();
  renderTable();
  resetForm();
});

function editTask(id) {
  const task = taskList.find((t) => t.id == id);
  nameInput.value = task.name;
  priorityInput.value = task.priority;
  dateInput.value = task.date;
  taskId.value = id;
}

function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;
  taskList = taskList.filter((t) => t.id !== id);
  saveToLocalStorage();
  renderTable();
}

// Initial render
renderTable();

if (taskList.length > 0) {
  document.querySelector(".task-controls").classList.remove("d-none");
  document.querySelector(".clear-btn").classList.remove("d-none");
}

