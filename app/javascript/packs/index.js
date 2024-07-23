document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
});

function fetchTasks() {
  fetch('/api/tasks')
    .then(response => {
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      return response.json();
    })
    .then(tasks => {
      displayTasks(tasks);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
}

function displayTasks(tasks) {
  tasks.forEach(task => {
    console.log(task);
    // Add code to display tasks on the page
  });
}

