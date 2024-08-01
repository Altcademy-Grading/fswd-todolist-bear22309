import $ from 'jquery'; // Ensure jQuery is imported if used
import 'bootstrap'; // Ensure Bootstrap is imported if used
window.$ = $;

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = document.querySelector('meta[name="api-key"]').getAttribute('content');

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
      });

      if (!response.ok) {
        throw new Error('Unauthorized');
      }

      const data = await response.json();
      displayTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async (title, description) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
        body: JSON.stringify({
          task: {
            title,
            description,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Unprocessable Entity');
      }

      const data = await response.json();
      addTaskToDOM(data.task);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const displayTasks = (tasks) => {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';
    tasks.forEach((task) => {
      addTaskToDOM(task);
    });
  };

  const addTaskToDOM = (task) => {
    const tasksContainer = document.getElementById('tasks-container');
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <button class="mark-complete">Mark Complete</button>
      <button class="delete-task">Delete</button>
    `;

    // Add event listeners to the buttons
    taskElement.querySelector('.mark-complete').addEventListener('click', () => markTaskComplete(task.id));
    taskElement.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.id));

    tasksContainer.appendChild(taskElement);
  };

  const markTaskComplete = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}/mark_complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error marking task complete:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const form = document.getElementById('create-task-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const description = event.target.description.value;
      createTask(title, description);
    });
  }

  fetchTasks();
});
