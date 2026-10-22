document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight Active Nav Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // 2. Interactive Task Planner Logic
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  if (addTaskBtn && taskInput && taskList) {
    const addTask = () => {
      const text = taskInput.value.trim();
      if (!text) return;

      const li = document.createElement('li');
      li.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); padding: 0.8rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;';
      li.innerHTML = `
        <span>${text}</span>
        <button class="btn" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5;">Delete</button>
      `;

      li.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
          li.style.opacity = li.style.opacity === '0.4' ? '1' : '0.4';
          li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        }
      });

      li.querySelector('button').addEventListener('click', () => li.remove());

      taskList.appendChild(li);
      taskInput.value = '';
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });
  }

  // 3. Client-Side Form Feedback Handler
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formStatus) {
        formStatus.style.color = '#22d3ee';
        formStatus.textContent = 'Form validation passed! Data processed successfully.';
      }
      contactForm.reset();
    });
  }
});
