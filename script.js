document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Chat navigation functionality
    const chatNavItems = document.querySelectorAll('.chat-nav-item');
    
    chatNavItems.forEach(item => {
        item.addEventListener('click', function() {
            chatNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Message item click functionality
    const messageItems = document.querySelectorAll('.message-item');
    
    messageItems.forEach(item => {
        item.addEventListener('click', function() {
            messageItems.forEach(msgItem => {
                msgItem.style.backgroundColor = '';
            });
            this.style.backgroundColor = '#f0f9ff';
        });
    });
    
    // Message input functionality
    const messageInput = document.querySelector('.input-field input');
    const sendButton = document.querySelector('.input-action:last-child');
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Create new message element
            const chatMessages = document.querySelector('.chat-messages');
            
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.innerHTML = `
                <div class="message-bubble-container">
                    <div class="message-info">
                        <span class="message-time">${getCurrentTime()}</span>
                        <span class="sender-name">You</span>
                    </div>
                    <div class="message-bubble">
                        <p>${message}</p>
                    </div>
                </div>
                <div class="avatar">
                    <img src="https://via.placeholder.com/32" alt="You">
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            messageInput.value = '';
        }
    }
    
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        return `${hours}:${minutes} ${ampm}`;
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .stat-item, .communicate-text, .rt-text');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    document.querySelectorAll('.feature-card, .stat-item, .communicate-text, .rt-text').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});