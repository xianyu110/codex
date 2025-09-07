// DOM Elements
const modal = document.getElementById('message-modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.querySelector('.close');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupAnimations();
});

// Setup Event Listeners
function setupEventListeners() {
    // Modal close
    closeModal.addEventListener('click', hideModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .pricing-card, .contact-card, .step, .link-card').forEach(el => {
        observer.observe(el);
    });
}

// Copy Code Function
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showModal('复制成功', `优惠码 <strong>${code}</strong> 已复制到剪贴板！`, 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showModal('复制成功', `优惠码 <strong>${code}</strong> 已复制到剪贴板！`, 'success');
    });
}

// Show Modal
function showModal(title, message, type = 'info') {
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    modalMessage.innerHTML = `<h3>${icon} ${title}</h3><p style="margin-top: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>`;
    modal.style.display = 'block';
    
    // Auto close success messages after 3 seconds
    if (type === 'success') {
        setTimeout(hideModal, 3000);
    }
}

// Hide Modal
function hideModal() {
    modal.style.display = 'none';
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
