import $ from 'jquery';
import { indexTasks, postTask } from './requests.js';

$(document).ready(function() {
  const apiKey = '6bf7fe67c3c6be17548afc461de6297f'; // Use actual user API key

  // Function to fetch and display tasks
  function fetchTasks() {
    indexTasks(
      function(response) {
        var taskList = $('#taskList');
        taskList.empty(); // Clear existing tasks
        response.tasks.forEach(function(task) {
          taskList.append('<div class="task-item">' +
            '<span>' + task.content + '</span>' +
            '<button class="btn btn-success btn-sm ml-2 mark-complete" data-id="' + task.id + '">Complete</button>' +
            '<button class="btn btn-danger btn-sm ml-2 delete-task" data-id="' + task.id + '">Delete</button>' +
            '</div>');
        });
      },
      function(request, errorMsg) {
        console.log('Error fetching tasks:', request, errorMsg);
      }
    );
  }

  // Initial fetch of tasks
  fetchTasks();

  // Event handler for adding a new task
  $('#addTaskButton').click(function() {
    var content = $('#taskContent').val();
    if (content) {
      postTask(
        content,
        function(response) {
          $('#taskContent').val(''); // Clear input field
          fetchTasks(); // Reload tasks
        },
        function(request, errorMsg) {
          console.log('Error creating task:', request, errorMsg);
        }
      );
    }
  });

  // Event delegation for task actions
  $('#taskList').on('click', '.mark-complete', function() {
    var taskId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: 'api/tasks/' + taskId + '/mark_complete?api_key=' + apiKey, 
      success: function(response) {
        fetchTasks(); // Reload tasks
      },
      error: function(request, errorMsg) {
        console.log('Error marking task as complete:', request, errorMsg);
      }
    });
  });

  $('#taskList').on('click', '.delete-task', function() {
    var taskId = $(this).data('id');
    $.ajax({
      type: 'DELETE',
      url: 'api/tasks/' + taskId + '?api_key=' + apiKey, 
      success: function(response) {
        fetchTasks(); // Reload tasks
      },
      error: function(request, errorMsg) {
        console.log('Error deleting task:', request, errorMsg);
      }
    });
  });
});

