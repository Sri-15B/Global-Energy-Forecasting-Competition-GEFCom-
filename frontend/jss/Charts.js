// ===============================
// Sidebar Navigation
// ===============================
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show the target page, hide others
        const target = btn.dataset.target;
        pages.forEach(p => {
            if (p.id === target) {
                p.style.display = 'block';
                p.style.opacity = 0;
                setTimeout(()=>p.style.opacity=1, 50); // smooth fade-in
            } else {
                p.style.display = 'none';
            }
        });
    });
});

// ===============================
// Dark / Light Theme Toggle
// ===============================
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if(savedTheme){
    document.body.classList.remove('dark','light');
    document.body.classList.add(savedTheme);
}

// ===============================
// Optional Login Simulation
// ===============================
const loginBtn = document.getElementById('loginBtn');
if(loginBtn){
    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('username')?.value;
        const password = document.getElementById('password')?.value;

        if(username && password){
            document.getElementById('loginSection').style.display = 'none';
            document.querySelector('.main').style.display = 'block';
        } else {
            alert("Please enter username and password!");
        }
    });
}

// ===============================
// Smooth page load animations
// ===============================
window.addEventListener('load', () => {
    pages.forEach(p => {
        if(p.style.display === 'block'){
            p.style.opacity = 0;
            setTimeout(()=>p.style.opacity=1, 50);
        }
    });
});

// ===============================
// Optional: AI popup animation
// ===============================
function showAIPopup(message){
    const popup = document.getElementById('aiPopup');
    popup.textContent = message;
    popup.style.opacity = 0;
    popup.style.transition = 'opacity 0.5s ease-in-out';
    popup.style.display = 'block';
    setTimeout(()=>popup.style.opacity=1, 50);

    setTimeout(()=>{
        popup.style.opacity=0;
        setTimeout(()=>popup.style.display='none', 500);
    }, 4000);
}
