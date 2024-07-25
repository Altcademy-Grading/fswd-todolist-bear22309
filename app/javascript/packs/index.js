document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
});

// Function to get the token (modify this as per your implementation)
function getAuthToken() {
  return localStorage.getItem('authToken'); // or wherever you're storing the token
}

function fetchTasks() {
  const token = getAuthToken(); // Get the token

  fetch('/api/tasks', {
    method: 'GET',
    headers: {
      'Authorization': token, // Include the token here
      'Content-Type': 'application/json'
    }
  })
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

