'strict';

const addTask = document.querySelector('#add');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const formTaskTitle = document.querySelector('.form__task-title');
const formTaskDescription = document.querySelector('.form__task-description');
const form = document.querySelector('.modal__form');
const taskList = document.querySelector('.tasks');
const btnClear = document.querySelector('.btn__clear-tasks');
const toDoDisp = document.querySelector('#td');
const completedDisp = document.querySelector('#comp');
const allDisp = document.querySelector('#all');

// load tasks from browser and display

// done button
// // output new task to list
// // save tasks to browser
// cancel button

// archive of completed tasks with button to view, option to delete

// Task class
class Task {
  date = new Intl.DateTimeFormat(navigator.language).format(new Date());
  complete = false;
  key = String(Math.floor(Date.now() / 1000)).slice(3);

  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

// Main App
class App {
  _tasks = [];

  constructor() {
    // Show modal input window when + is clicked
    addTask.addEventListener('click', this._showModal.bind(this));
    // Close modal on close button (X) click
    btnCloseModal.addEventListener('click', this._closeModal);
    // Close modal when user clicks off modal window
    overlay.addEventListener('click', this._closeModal);
    // Close on esc key press
    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this._closeModal();
        }
      }.bind(this)
    );

    form.addEventListener('submit', this._submitForm.bind(this));

    // Toggle the completed mark on tasks.
    taskList.addEventListener('click', this._toggleComplete.bind(this));

    // Load and display tasks from local storage
    this._getTasksFromLocal();

    // Clear all tasks from _task array and local storage
    btnClear.addEventListener('click', this._clear.bind(this));

    // Display to do tasks
    toDoDisp.addEventListener('click', this._toDoDisp.bind(this));

    // Display completed tasks
    completedDisp.addEventListener('click', this._compDisp.bind(this));

    // Display all tasks
    allDisp.addEventListener('click', this._allDisp.bind(this));
  }

  ///////////////////// REFACTOR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Show only to do tasks
  _toDoDisp() {
    const toDo = this._tasks.filter(task => !task.complete);
    taskList.innerHTML = '';
    toDo.forEach(task => this._renderTask(task));
  }

  // Show only completed tasks
  _compDisp() {
    const done = this._tasks.filter(task => task.complete);
    taskList.innerHTML = '';
    done.forEach(task => this._renderTask(task));
  }

  // Show all tasks
  _allDisp() {
    taskList.innerHTML = '';
    this._tasks.forEach(task => this._renderTask(task));
  }
  ///////////////////// REFACTOR END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // Function to show the modal input window
  _showModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  // Function to close the modal input window
  _closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  _renderTask(task) {
    const html = `
    <div class="task-row">
      <div class="task-title" id="${task.key}">
        <span class="material-icons md-36 tertiary" id="completed">${
          task.complete ? 'check_' : ''
        }circle</span>
        <span>Task - ${task.title}</span>
        <span style="font-size: 14pt">${task.date}</span>
      </div>
      <div class="task-description">
        ${task.description}
      </div>
    </div>
    `;

    taskList.insertAdjacentHTML('afterbegin', html);
  }

  _saveToLocal() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }

  // Renders all tasks from local storage
  _getTasksFromLocal() {
    const data = JSON.parse(localStorage.getItem('tasks'));

    if (!data) return;

    this._tasks = data;
    this._tasks.forEach(task => this._renderTask(task));
  }

  // Take modal form input and places it in tasks array
  _submitForm(e) {
    e.preventDefault();
    const task = new Task(formTaskTitle.value, formTaskDescription.value);
    this._tasks.push(task);
    this._saveToLocal();
    this._renderTask(task);
    this._closeModal();
    formTaskTitle.value = formTaskDescription.value = '';
  }

  _toggleComplete(e) {
    // Select the closest element with the id value 'completed'
    const tickCircle = e.target.closest('#completed');
    if (!tickCircle) return;
    // Get the id of the parent element. This is the key assigned to each task object.
    const taskKey = tickCircle.parentElement.id;
    // Find the task in _tasks array with that key value.
    const task = this._tasks.find(task => task.key === taskKey);
    // Toggle the completed value.
    task.complete = !task.complete;
    // Re-render the task list to show the changed completed mark.
    taskList.innerHTML = '';
    this._tasks.forEach(task => this._renderTask(task));
    // Save the changes to local storage.
    this._saveToLocal();
  }

  // Clear all tasks from _tasks array and local storage
  _clear() {
    this._tasks = [];
    console.log(this._tasks);
    localStorage.removeItem('tasks');
    taskList.innerHTML = '';
  }
}

const app = new App();
