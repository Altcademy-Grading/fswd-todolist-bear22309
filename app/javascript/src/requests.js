import $ from 'jquery';

// Setup for handling CSRF tokens
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

// Function to fetch all tasks for a user
var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1', // Replace '1' with the actual API key or user ID as needed
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};

// Function to create a new task
var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1', // Replace '1' with the actual API key or user ID as needed
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};

// Exporting the functions to be used in other modules
export { indexTasks, postTask };

// Example usage of indexTasks to fetch tasks (commented out for production)
// indexTasks(
//   function (response) {
//     console.log('Tasks fetched:', response);
//   },
//   function (request, errorMsg) {
//     console.log('Error fetching tasks:', request, errorMsg);
//   }
// );

// Example usage of postTask to create a new task (commented out for production)
// postTask(
//   'This is a new task...',
//   function (response) {
//     console.log('Task created:', response);
//   },
//   function (request, errorMsg) {
//     console.log('Error creating task:', request, errorMsg);
//   }
// );

