document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight Active Nav Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // 2. Advanced Academic Task Planner & Lecturer Email Submission
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  if (addTaskBtn && taskList) {
    addTaskBtn.addEventListener('click', () => {
      const title = document.getElementById('taskTitle').value.trim();
      const startDate = document.getElementById('startDate').value;
      const dueDate = document.getElementById('dueDate').value;
      const lecturerEmail = document.getElementById('lecturerEmail').value.trim();
      const notes = document.getElementById('taskNotes').value.trim();

      if (!title || !startDate || !dueDate || !lecturerEmail) {
        alert('Please fill in all required fields (Title, Assigned Date, Deadline, and Lecturer Email).');
        return;
      }

      const taskCard = document.createElement('div');
      taskCard.className = 'card';
      taskCard.style.cssText = 'padding: 1.2rem; margin-bottom: 0.8rem; background: rgba(255,255,255,0.02); border-left: 4px solid var(--accent-cyan);';

      const subject = encodeURIComponent(`Assessment Submission: ${title}`);
      const body = encodeURIComponent(`Dear Lecturer,\n\nPlease find my assessment submission details below:\n\nAssessment Title: ${title}\nAssigned Date: ${startDate}\nSubmission Date: ${dueDate}\n\nSubmission Notes / Links:\n${notes}\n\nBest regards,\nStudent Portfolio System`);
      const mailtoUrl = `mailto:${lecturerEmail}?subject=${subject}&body=${body}`;

      taskCard.innerHTML = `
        <h3 style="margin-bottom: 0.4rem; color: #ffffff;">${title}</h3>
        <p style="font-size: 0.85rem; margin-bottom: 0.5rem; color: var(--text-muted);">
          <strong>Assigned:</strong> ${startDate} | <strong>Deadline:</strong> ${dueDate}
        </p>
        <p style="font-size: 0.85rem; margin-bottom: 0.8rem;"><strong>Lecturer Email:</strong> ${lecturerEmail}</p>
        ${notes ? `<p style="font-size: 0.85rem; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 6px; margin-bottom: 0.8rem;">${notes}</p>` : ''}
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="${mailtoUrl}" class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: #059669;">Submit to Lecturer via Email</a>
          <button class="btn delete-btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5;">Delete</button>
        </div>
      `;

      taskCard.querySelector('.delete-btn').addEventListener('click', () => taskCard.remove());
      taskList.appendChild(taskCard);

      // Reset Inputs
      document.getElementById('taskTitle').value = '';
      document.getElementById('startDate').value = '';
      document.getElementById('dueDate').value = '';
      document.getElementById('lecturerEmail').value = '';
      document.getElementById('taskNotes').value = '';
    });
  }

  // 3. Direct Contact Email Outreach Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const type = document.getElementById('inquiryType').value;
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`[${type} Inquiry] Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInquiry Type: ${type}\n\nMessage:\n${message}`);
      
      // Opens user's default email client pre-filled
      window.location.href = `mailto:obasi253@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
