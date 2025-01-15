// タスク管理アプリケーションのためのJavaScriptコード

// 1. DOM要素の取得
const taskInput = document.getElementById('task');
const taskForm = document.querySelector('form');
const taskList = document.getElementById('task-list');

// 2. タスクの追加機能
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // フォーム送信時にページがリロードされないようにする

  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('タスクを入力してください。');
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  // 3. タスクの完了/未完了の切り替え機能
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      taskItem.classList.add('completed');
    } else {
      taskItem.classList.remove('completed');
    }
  });
  taskItem.prepend(checkbox);

  // 4. タスクの削除機能
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';
  deleteButton.addEventListener('click', function() {
    taskList.removeChild(taskItem);
  });
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
  taskInput.value = ''; // 入力フィールドをクリア
});

// 5. タスクのフィルタリング機能
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