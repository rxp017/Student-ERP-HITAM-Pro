document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const elements = {
        loginForm: document.getElementById('login-form'),
        loginContainer: document.querySelector('.login-container'),
        erpContainer: document.querySelector('.erp-container'),
        logoutBtn: document.getElementById('logout-btn'),
        sidebarLinks: document.querySelectorAll('.sidebar ul li a'),
        contentDiv: document.getElementById('content'),
        chatIcon: document.querySelector('.chat-icon'),
        chatWindow: document.querySelector('.chat-window'),
        welcomeMessage: document.querySelector('.header h1')
    };

    // --- Mock Data ---
    const studentData = {
        name: 'Alex Johnson',
        rollNumber: '24XJ1A0500',
        branch: 'Computer Science',
        email: 'alex.j@hitam.org',
        mobile: '+91 9876543210',
        attendance: '85%',
        backlogs: 0
    };

    const PAGES_CONFIG = {
        'academic-calendar': {
            title: 'ACADEMIC CALENDAR',
            render: () => 
                <table>
                    <thead><tr><th>Date</th><th>Event</th></tr></thead>
                    <tbody>
                        <tr><td>2025-09-15</td><td>Mid-Term Exams Start</td></tr>
                        <tr><td>2025-10-02</td><td>Gandhi Jayanti Holiday</td></tr>
                        <tr><td>2025-10-23</td><td>Dussehra Holidays Start</td></tr>
                    </tbody>
                </table>
        },
        'fee-details': {
            title: 'FEE DETAILS',
            render: () => 
                <div class="card">
                    <p><strong>Tuition Fee:</strong> <span class="status-paid">Paid</span></p>
                    <p><strong>Hostel Fee:</strong> <span class="status-paid">Paid</span></p>
                    <p><strong>Transport Fee:</strong> Not Applicable</p>
                    <button class="primary-btn" data-action="pay-online">Pay Online</button>
                </div>
        },
        'student-profile': {
            title: 'STUDENT PROFILE',
            render: () => 
                <div class="profile-grid">
                    <p><strong>Name:</strong> \</p>
                    <p><strong>Roll Number:</strong> \</p>
                    <p><strong>Branch:</strong> \</p>
                    <p><strong>Email:</strong> \</p>
                    <p><strong>Mobile:</strong> \</p>
                    <p><strong>Overall Attendance:</strong> \</p>
                </div>
        },
        'attendance': {
            title: 'ATTENDANCE',
            render: () => 
                <div class="stats-container">
                    <h3>Current Attendance: \</h3>
                    <p>Status: <span class="status-good">Satisfactory</span></p>
                </div>
        }
    };

    // --- Core Functions ---
    function loadContent(pageId) {
        const config = PAGES_CONFIG[pageId];
        let html = '';
        
        if (config) {
            html = \<h2>\</h2>\\;
        } else {
            html = \<h2>\</h2>
                    <p class="placeholder-text">This module is currently under development and will be available in the next update.</p>\;
        }

        elements.contentDiv.innerHTML = html;
        
        // Update Active State
        elements.sidebarLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-content') === pageId);
        });
    }

    // --- Event Listeners ---
    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        elements.loginContainer.style.display = 'none';
        elements.erpContainer.style.display = 'flex';
        elements.welcomeMessage.textContent = \Welcome, \!\;
        loadContent('student-profile');
    });

    elements.logoutBtn.addEventListener('click', () => {
        elements.loginContainer.style.display = 'block';
        elements.erpContainer.style.display = 'none';
        elements.welcomeMessage.textContent = 'Welcome, Student!';
    });

    // Sidebar Navigation
    document.querySelector('.sidebar').addEventListener('click', (e) => {
        const link = e.target.closest('a[data-content]');
        if (!link) return;
        
        e.preventDefault();
        const contentId = link.getAttribute('data-content');
        
        // Handle submenus
        const submenu = link.nextElementSibling;
        if (submenu && submenu.tagName === 'UL') {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        } else {
            loadContent(contentId);
        }
    });

    // Global Content Actions (Fixed memory leak)
    elements.contentDiv.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        if (action === 'pay-online') {
            loadContent('online-payment');
        }
    });

    elements.chatIcon.addEventListener('click', () => {
        elements.chatWindow.style.display = elements.chatWindow.style.display === 'none' ? 'block' : 'none';
    });
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => { AOS.init({ duration: 800, once: true }); });
