// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Typing Animation =====
const typingElement = document.querySelector('.typing');
const words = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
let currentWord = 0;
let currentChar = 0;
let isDeleting = false;

function type() {
    const word = words[currentWord];
    
    if (isDeleting) {
        typingElement.textContent = word.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingElement.textContent = word.substring(0, currentChar + 1);
        currentChar++;
    }

    if (!isDeleting && currentChar === word.length) {
        setTimeout(() => {
            isDeleting = true;
            type();
        }, 2000);
        return;
    }

    if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentWord = (currentWord + 1) % words.length;
        setTimeout(type, 500);
        return;
    }

    setTimeout(type, isDeleting ? 100 : 150);
}

// Start typing animation
type();

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll Animation Observer =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Using Formspree for email handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields!');
            return;
        }

        // Create FormData and submit to Formspree
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        // Submit to Formspree endpoint
        fetch('https://formspree.io/f/mbdjolkr', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Show success message
                const submitBtn = this.querySelector('.btn-primary');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '✓ Message Sent to bailey@example.com!';
                submitBtn.style.background = '#10b981';

                // Reset form
                this.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);

                console.log('Form submitted successfully!', { name, email, subject, message });
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        });
    });
}

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero-image img');
    parallaxElements.forEach(element => {
        let scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// ===== Project Card Hover Effect =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== Service Card Hover Effect =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Animate on Scroll =====
function handleScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Add CSS for Ripple Effect =====
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// ===== Performance Optimization - Debounce =====
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    handleScroll();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===== Blog Filter and Search =====
function searchBlogPosts(query) {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.textContent.toLowerCase();
        if (title.includes(query.toLowerCase()) || content.includes(query.toLowerCase())) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== Testimonials Auto Rotate =====
const testimonialCards = document.querySelectorAll('.testimonial-card');
if (testimonialCards.length > 0) {
    let currentTestimonial = 0;
    setInterval(() => {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentTestimonial ? '1' : '0.7';
        });
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }, 5000);
}

// ===== Reveal Elements on Scroll =====
const revealElements = document.querySelectorAll('.blog-card, .testimonial-card, .service-card, .project-card');

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            revealOnScroll.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => revealOnScroll.observe(element));

// ===== Reading Time Calculator =====
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

// ===== Copy Blog Title to Clipboard =====
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const title = card.querySelector('h3').textContent;
        navigator.clipboard.writeText(title);
        const message = document.createElement('div');
        message.textContent = '✓ Copied!';
        message.style.cssText = 'position: fixed; top: 20px; right: 20px; background: var(--primary-color); color: white; padding: 10px 20px; border-radius: 5px; z-index: 1000;';
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    });
});

// ===== Smooth Section Scroll with Offset =====
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    const navHeight = document.querySelector('.navbar').offsetHeight;
    if (section) {
        const sectionTop = section.offsetTop - navHeight;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// ===== Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ===== Server Details Modal =====
const serverData = {
    ottawa: {
        title: 'Greater Ottawa Roleplay Server',
        description: 'Greater Ottawa Roleplay Server is a premier immersive ERLC roleplay experience. Our server features a realistic economy system with diverse job opportunities, professional law enforcement and emergency services departments, and community-driven gameplay that emphasizes storytelling and character development. We host dynamic events regularly, offer engaging storylines for players of all levels, and maintain a supportive community focused on quality roleplay. Join thousands of players in experiencing authentic, thrilling roleplay scenarios in the Ottawa region.',
        link: 'https://discord.gg/mvqnKB9Rry'
    },
    texas: {
        title: 'Texas State Roleplay',
        description: 'Texas State Roleplay is an expansive ERLC server set in the heart of Texas. Experience realistic law enforcement operations with our professional police and sheriff departments, fully functional emergency services, and diverse business opportunities. The server features a detailed Texas economy, authentic location landmarks, and immersive roleplay scenarios. Whether you\'re looking for criminal roleplay, legitimate business ventures, or law enforcement careers, Texas State Roleplay offers something for everyone in the Lone Star State.',
        link: '#'
    },
    georgia: {
        title: 'Georgia State Roleplay',
        description: 'Georgia State Roleplay brings southern charm and immersive gameplay to ERLC. Explore a detailed Georgian landscape with realistic law enforcement agencies, comprehensive emergency services, and thriving business sectors. The server emphasizes community interaction and dynamic storytelling. Experience authentic gang roleplay, legitimate business ownership, law enforcement careers, and everything in between. Join our welcoming Georgia community and become part of an ever-growing roleplay experience in the heart of the South.',
        link: '#'
    }
};

// ===== Blog Article Data =====
const blogData = {
    'discord-bot': {
        title: 'Getting Started with Discord.py Bot Development',
        category: 'Discord Development',
        content: 'Learn how to create powerful Discord bots from scratch using Discord.py. This comprehensive guide covers everything you need to know:\n\n<strong>Setup & Installation:</strong> Get Python and Discord.py installed and configured. Create your first bot application on Discord Developer Portal.\n\n<strong>Basic Commands:</strong> Learn how to build command systems, handle user input, and respond to messages. Understand command groups and subcommands.\n\n<strong>Event Handling:</strong> Master Discord events like on_message, on_member_join, and on_reaction_add. Build responsive bots that react to server activities.\n\n<strong>Advanced Features:</strong> Implement embeds, reactions, buttons, and select menus. Create databases to store persistent data. Build moderation tools and fun entertainment commands.\n\n<strong>Best Practices:</strong> Learn about error handling, logging, and security. Deploy your bot on hosting platforms and keep it running 24/7.\n\nWhether you\'re building a fun entertainment bot, moderation tool, or utility helper for your Discord community, this guide will get you started on the right path!'
    },
    'erlc-server': {
        title: 'Best Practices for ERLC Roleplay Server Setup',
        category: 'Server Management',
        content: 'Explore essential tips and best practices for configuring and managing a successful ERLC roleplay server:\n\n<strong>Initial Setup:</strong> Configure server properties, set up custom rules, and establish player limits. Create clear server descriptions to attract the right players.\n\n<strong>Community Management:</strong> Recruit experienced moderators and admins. Establish clear rules of conduct and consequences for rule breaking. Foster a welcoming and inclusive community.\n\n<strong>Script Configuration:</strong> Customize game mechanics and job systems. Configure economy systems that encourage roleplay. Optimize server performance and reduce lag.\n\n<strong>Player Engagement:</strong> Host regular events and tournaments. Create compelling storylines and progression systems. Reward active roleplayers and community contributors.\n\n<strong>Technical Administration:</strong> Regular backups and maintenance routines. Monitor server logs for issues. Keep scripts and systems updated.\n\n<strong>Growth Strategies:</strong> Advertise on roleplay server lists. Build social media presence. Encourage word-of-mouth through quality gameplay.\n\nA successful server combines technical excellence with great community management. By following these practices, you\'ll create a thriving roleplay community!'
    },
    'web-dev': {
        title: 'Building Responsive Websites with Modern JavaScript',
        category: 'Web Development',
        content: 'Discover techniques for building responsive, high-performance websites using HTML, CSS, and JavaScript:\n\n<strong>Responsive Design Fundamentals:</strong> Master mobile-first design principles. Use CSS Grid and Flexbox for flexible layouts. Implement media queries for different screen sizes.\n\n<strong>Modern JavaScript:</strong> Learn ES6+ features like arrow functions, destructuring, and async/await. Use fetch API for data loading. Implement interactive features without heavy frameworks.\n\n<strong>Performance Optimization:</strong> Minimize and compress assets. Use lazy loading for images. Implement caching strategies. Optimize critical rendering path.\n\n<strong>User Experience:</strong> Create smooth animations and transitions. Implement loading states and error handling. Design accessible interfaces that work for everyone.\n\n<strong>Development Workflow:</strong> Use version control with Git. Implement debugging tools and browser DevTools. Test across different browsers and devices.\n\n<strong>Deployment:</strong> Choose hosting providers like GitHub Pages, Vercel, or Netlify. Configure domains and SSL certificates. Monitor performance in production.\n\nBuilding with vanilla HTML, CSS, and JavaScript gives you maximum control and minimal dependencies. Master these fundamentals and you\'ll be able to build anything!'
    }
}
};

const modal = document.getElementById('serverModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalLink = document.getElementById('modalLink');
const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
const modalClose = document.querySelector('.modal-close');
const modalCloseBtn = document.getElementById('modalClose');

function openModal(serverId) {
    const server = serverData[serverId];
    if (server) {
        modalTitle.textContent = server.title;
        modalBody.textContent = server.description;
        modalLink.href = server.link;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const serverId = btn.getAttribute('data-server');
        openModal(serverId);
    });
});

modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== Blog Article Modal =====
const blogModal = document.getElementById('blogModal');
const blogModalTitle = document.getElementById('blogModalTitle');
const blogModalCategory = document.getElementById('blogModalCategory');
const blogModalBody = document.getElementById('blogModalBody');
const blogReadMoreBtns = document.querySelectorAll('.blog-read-more');
const blogModalClose = document.querySelector('#blogModalClose');
const blogModalCloseBtn = document.querySelector('#blogModal .modal-close');

function openBlogModal(articleId) {
    const article = blogData[articleId];
    if (article) {
        blogModalTitle.textContent = article.title;
        blogModalCategory.textContent = article.category;
        blogModalBody.innerHTML = article.content;
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

blogReadMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = btn.getAttribute('data-article');
        openBlogModal(articleId);
    });
});

blogModalCloseBtn.addEventListener('click', closeBlogModal);
blogModalClose.addEventListener('click', closeBlogModal);

blogModal.addEventListener('click', (e) => {
    if (e.target === blogModal) {
        closeBlogModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeBlogModal();
    }
});

console.log('Portfolio loaded successfully! 🚀');
