// Sidebar navigation
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.page');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.target;
    sections.forEach(sec => sec.style.display = (sec.id === target ? 'block' : 'none'));
  });
});

// Dark/Light toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

// Simple login
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    document.getElementById('loginSection').style.display = 'none';
    document.querySelector('.main').style.display = 'block';
  });
}
