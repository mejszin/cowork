var state;

function changeState(s) {
    state = s;
    // Chat
    var chat_button = document.getElementById('chat-button');
    chat_button.className = (state == 'chat') ? 'is-active ': 'is-inactive';
    var chat_button_text = document.getElementById('chat-button-text');
    chat_button_text.innerText = state == 'chat' ? 'Chat view' : '';
    // Todo
    var todo_button = document.getElementById('todo-button');
    todo_button.className = (state == 'todo') ? 'is-active ': 'is-inactive';
    var todo_button_text = document.getElementById('todo-button-text');
    todo_button_text.innerText = (state == 'todo') ? 'To-do view' : '';
    // Gallery
    var gallery_button = document.getElementById('gallery-button');
    gallery_button.className = (state == 'gallery') ? 'is-active ': 'is-inactive';
    var gallery_button_text = document.getElementById('gallery-button-text');
    gallery_button_text.innerText = (state == 'gallery') ? 'Gallery view' : '';
}