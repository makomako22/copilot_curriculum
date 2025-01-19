const taskInput = document.getElementById('task');
const taskForm = document.querySelector('form');
const taskList = document.getElementById('task-list');

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = [];
  const taskItems = taskList.getElementsByTagName('li');
  for (let taskItem of taskItems) {
    const taskText = taskItem.textContent.replace('削除', '').trim();
    const isCompleted = taskItem.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  for (let task of tasks) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
      saveTasksToLocalStorage();
    });
    taskItem.prepend(checkbox);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(taskItem);
      saveTasksToLocalStorage();
    });
    taskItem.appendChild(deleteButton);

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
  }
}

// Load tasks when the page is loaded
window.addEventListener('load', loadTasksFromLocalStorage);

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('タスクを入力してください。');
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      taskItem.classList.add('completed');
    } else {
      taskItem.classList.remove('completed');
    }
    saveTasksToLocalStorage();
  });
  taskItem.prepend(checkbox);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';
  deleteButton.addEventListener('click', function() {
    taskList.removeChild(taskItem);
    saveTasksToLocalStorage();
  });
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
  taskInput.value = '';
  saveTasksToLocalStorage();
});

function filterTasks(filter) {
  const tasks = taskList.getElementsByTagName('li');
  for (let task of tasks) {
    switch (filter) {
      case 'all':
        task.style.display = '';
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed') ? '' : 'none';
        break;
      case 'incomplete':
        task.style.display = task.classList.contains('completed') ? 'none' : '';
        break;
    }
  }
}
