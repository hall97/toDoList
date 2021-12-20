'strict';

const addTask = document.querySelector('#add');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const formTaskTitle = document.querySelector('.form__task-title');
const formTaskDescription = document.querySelector('.form__task-description');
const form = document.querySelector('.modal__form');
const taskList = document.querySelector('.task-row');

// load tasks from browser and display

// done button
// // output new task to list
// // save tasks to browser
// cancel button

// archive of completed tasks with button to view, option to delete

/// Main App

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
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        this._closeModal();
      }
    });

    form.addEventListener('submit', this._submitForm.bind(this));
  }

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

  // Take modal form input and places it in tasks array
  _submitForm(e) {
    e.preventDefault();
    const task = {
      title: formTaskTitle.value,
      description: formTaskDescription.value,
      timeDate: new Date(),
      complete: false,
    };
    this._tasks.push(task);

    const html = `
    <div class="task-row">
      <div class="task-title">Task - ${task.title}</div>
      <div class="task-description">
        ${task.description}
      </div>
    </div>
    `;

    taskList.insertAdjacentHTML('beforebegin', html);

    this._closeModal();
  }
}

const app = new App();
