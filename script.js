/* =========================================================
   Student Task Manager — script.js
   Plain, beginner-friendly JavaScript.
   No frameworks, no external libraries.

   Sections:
   1. State (the array of task objects)
   2. localStorage helpers (save / load)
   3. DOM references
   4. Render function (draws the UI from the state)
   5. Event listeners (add, toggle, delete, filter)
   6. App startup
   ========================================================= */

/* ---------------------------------------------------------
   1. STATE
   Every task is a simple object: { id, text, completed }.
   "tasks" is the single source of truth for the whole app.
   currentFilter controls which tasks are shown: "all",
   "active" or "completed".
   --------------------------------------------------------- */
let tasks = [];
let currentFilter = "all";

const STORAGE_KEY = "student-task-manager-tasks";

/* ---------------------------------------------------------
   2. LOCALSTORAGE HELPERS
   localStorage can only store strings, so we convert the
   tasks array to/from JSON text.
   --------------------------------------------------------- */
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  // If nothing has been saved yet, start with an empty list.
  tasks = stored ? JSON.parse(stored) : [];
}

/* ---------------------------------------------------------
   3. DOM REFERENCES
   Grabbing every element we need once, up front.
   --------------------------------------------------------- */
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const formError = document.getElementById("form-error");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");

const totalCountEl = document.getElementById("total-count");
const activeCountEl = document.getElementById("active-count");
const completedCountEl = document.getElementById("completed-count");

const filterButtons = document.querySelectorAll(".filter-btn");

/* ---------------------------------------------------------
   4. RENDER
   This is the only function that touches the visible task
   list. Whenever the data changes, we call render() again
   and it rebuilds the list to match the current state.
   --------------------------------------------------------- */
function render() {
  // Decide which tasks to show, based on the active filter.
  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // "all"
  });

  // Clear the current list before redrawing it.
  taskList.innerHTML = "";

  // Show a friendly message if there is nothing to display.
  emptyState.style.display = visibleTasks.length === 0 ? "flex" : "none";

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = task.id;

    li.innerHTML = `
      <input
        type="checkbox"
        class="task-checkbox"
        ${task.completed ? "checked" : ""}
        aria-label="Mark '${escapeHtml(task.text)}' as ${task.completed ? "active" : "completed"}"
      />
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="task-delete" aria-label="Delete '${escapeHtml(task.text)}'">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 4h10M6.5 4V2.5h3V4M4.5 4l.6 9a1 1 0 0 0 1 .9h3.8a1 1 0 0 0 1-.9l.6-9"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

// Basic protection against HTML injection when a task's text
// is inserted into the page.
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Updates the "Total / Active / Completed" numbers.
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  totalCountEl.textContent = total;
  activeCountEl.textContent = active;
  completedCountEl.textContent = completed;
}

/* ---------------------------------------------------------
   5. EVENT LISTENERS
   --------------------------------------------------------- */

// Add a new task when the form is submitted.
taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = taskInput.value.trim();

  // Requirement: prevent adding an empty task.
  if (text === "") {
    formError.textContent = "Please type a task before adding it.";
    return;
  }

  const newTask = {
    id: Date.now().toString(), // simple unique id
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  render();

  taskInput.value = "";
  formError.textContent = "";
  taskInput.focus();
});

// Clear the error message as soon as the user starts typing again.
taskInput.addEventListener("input", () => {
  formError.textContent = "";
});

// Handle checkbox toggles and delete clicks.
// A single listener on the list (event delegation) is simpler
// than adding a listener to every individual task.
taskList.addEventListener("click", (event) => {
  const taskItem = event.target.closest(".task-item");
  if (!taskItem) return;

  const taskId = taskItem.dataset.id;

  if (event.target.classList.contains("task-checkbox")) {
    toggleTask(taskId);
  }

  if (event.target.closest(".task-delete")) {
    deleteTask(taskId);
  }
});

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

// Filter buttons (All / Active / Completed).
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    // Update which button looks "active".
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    render();
  });
});

/* ---------------------------------------------------------
   6. APP STARTUP
   --------------------------------------------------------- */
function init() {
  loadTasks();
  render();
}

init();
