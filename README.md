# Student Task Manager

A small, polished task manager built to help students track assignments, readings and deadlines — created as a portfolio project to demonstrate core front-end web development skills using **plain HTML, CSS and JavaScript** (no frameworks, no backend).

# Description

Student Task Manager is a single-page web app for organizing everyday academic tasks. Users can add tasks, mark them as done, delete them, and filter their list by status. All data is saved locally in the browser, so a student's task list is still there the next time they open the page — no login, no server, no database required.

The project was intentionally kept small and dependency-free so that every line of code is easy to read, explain and defend in a technical interview or university presentation.

# Features

-  **Add tasks** through a simple input field and button
-  **Mark tasks as completed / uncompleted** with a custom checkbox
-  **Delete tasks** individually
-  **Filter tasks** by All, Active, or Completed
-  **Live stats** showing total, active and completed task counts
-  **Persistent storage** — tasks survive a page refresh via `localStorage`
-  **Friendly empty state** when there are no tasks to show
-  **Input validation** — empty tasks cannot be added
-  **Fully responsive** — works on desktop, tablet and mobile
-  **Accessible** — visible keyboard focus states and ARIA labels

# Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Styling, layout (Flexbox), responsiveness, custom checkboxes |
| **Vanilla JavaScript (ES6)** | App logic, DOM manipulation, state management |
| **localStorage Web API** | Persisting tasks between sessions |

No React, no Bootstrap/Tailwind, no build tools and no backend — everything runs directly in the browser.

# How to Run the Project

This is a fully static project, so no installation or build step is required.

1. **Download or clone the repository**
   ```bash
   git clone https://github.com/<your-username>/student-task-manager.git
   cd student-task-manager
   ```
2. **Open `index.html` in any modern web browser**
   - Double-click the file, **or**
   - Right-click → "Open with" → your browser, **or**
   - Use a tool like the VS Code "Live Server" extension for automatic reloading during development.

That's it — no `npm install`, no server, no configuration.

---

## How localStorage Is Used

The app keeps its list of tasks in a single JavaScript array (`tasks`), where each task is an object shaped like this:

```js
{ id: "1716830271345", text: "Finish Chapter 4 reading notes", completed: false }
```

Because `localStorage` can only store **strings**, the array is converted to and from JSON text:

- **Saving:** every time a task is added, toggled, or deleted, `saveTasks()` runs `JSON.stringify(tasks)` and stores the result under the key `"student-task-manager-tasks"`.
- **Loading:** when the page first loads, `loadTasks()` reads that key with `localStorage.getItem()` and runs `JSON.parse()` to turn it back into a real array of task objects. If nothing has been saved yet, the app simply starts with an empty list.

This means the browser itself acts as the "database" for the app — no server or account is needed for the data to persist.

# Future Improvements

- Add due dates and priority levels (e.g. High / Medium / Low) per task
- Group or sort tasks by subject/course
- Add drag-and-drop reordering of tasks
- Add an "Edit task" option instead of only delete-and-recreate
- Add a dark mode toggle
- Add subtle animations when clearing completed tasks in bulk
- Sync tasks across devices using a small backend (e.g. Firebase) as a stretch goal

# What I Learned

Building this project helped me practice and demonstrate the following core JavaScript and web development concepts:

- **DOM manipulation** — creating, updating and removing elements dynamically with `document.createElement`, `innerHTML`, and `appendChild`, instead of hardcoding markup.
- **Event listeners & event delegation** — handling `submit`, `click`, and `input` events, and using a single listener on the task list (rather than one per task) to efficiently handle clicks on checkboxes and delete buttons.
- **Arrays and array methods** — using `push()` to add tasks, `filter()` to remove tasks and to build the "Active"/"Completed" views, `find()` to locate a specific task by id, and `forEach()` to render each task or wire up the filter buttons.
- **Objects as data models** — representing each task as a small object with clear properties (`id`, `text`, `completed`) rather than loose variables.
- **State management basics** — keeping one array (`tasks`) as the single source of truth, and always re-rendering the UI from that state instead of editing the DOM by hand in multiple places.
- **Working with the localStorage Web API** — persisting and restoring application data using `JSON.stringify()` / `JSON.parse()`.
- **Form handling & validation** — preventing the default form submission, trimming whitespace, and blocking empty task entries with user feedback.
- **Responsive, accessible CSS** — building a layout with Flexbox that adapts from desktop to mobile, styling custom checkboxes, and adding visible focus states and ARIA labels for accessibility.



