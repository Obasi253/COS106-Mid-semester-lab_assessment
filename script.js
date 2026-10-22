// ==================== 1. TASK PLANNER LOGIC ====================
let tasks = [
    { id: 1, text: "Complete COS 106 Term Project files", completed: true },
    { id: 2, text: "Review JavaScript DOM manipulation & event handlers", completed: false }
];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return; 

    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No active tasks. Add one above!</p>';
        return;
    }

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <span onclick="toggleTask(${task.id})" style="cursor:pointer; flex: 1;">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(div);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input) return;

    const text = input.value.trim();

    if (text === '') {
        alert('Please write a task description first!');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    input.value = '';
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});


// ==================== 2. FORM VALIDATION LOGIC ====================
function validateAndSend(event) {
    event.preventDefault();
    const errorBox = document.getElementById('errorBox');
    if (!errorBox) return;

    errorBox.innerText = '';

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('emailAddr');
    const phoneInput = document.getElementById('phoneNum');
    const msgInput = document.getElementById('msgContent');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = msgInput ? msgInput.value.trim() : '';

    // 1. Check for Empty Fields
    if (!name || !email || !phone || !message) {
        errorBox.innerText = '⚠️ All form fields are required.';
        return;
    }

    // 2. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorBox.innerText = '⚠️ Please enter a valid email address.';
        return;
    }

    // 3. Phone Digits-Only Validation
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
        errorBox.innerText = '⚠️ Phone number must contain digits only.';
        return;
    }

    // Success response
    alert('Validation Successful! Your message has been processed.');
    document.getElementById('contactForm').reset();
}
