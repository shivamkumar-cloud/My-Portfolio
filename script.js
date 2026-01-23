// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const sections = document.querySelectorAll('.section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectModals = document.querySelectorAll('.project-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const statNumbers = document.querySelectorAll('.stat-number');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contact-form');
    const navbar = document.querySelector('.navbar');
    
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default for anchor links
            e.preventDefault();
            
            // Close mobile menu
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Show the corresponding section
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // SMOOTH SCROLLING to section
            smoothScrollToSection(targetId);
        });
    });
    
    // Function for smooth scrolling to section
    function smoothScrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Function to show a specific section
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Animate elements when section becomes active
            if (sectionId === 'home') {
                setTimeout(() => {
                    animateStats();
                    animateShapes();
                }, 300);
            }
            
            if (sectionId === 'skills') {
                setTimeout(animateSkills, 300);
            }
        }
    }
    
    // Animate floating shapes
    function animateShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.animation = `float 6s infinite ease-in-out ${index * 1.5}s`;
        });
    }
    
    // Animate statistics counter
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Animate skill bars
    function animateSkills() {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
    
    // Projects filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project modal functionality
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href').substring(1);
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.project-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"][placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Typing effect for hero text
    function initTypingEffect() {
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            const text = typewriter.textContent;
            typewriter.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    typewriter.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 100);
        }
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars if skills section is in view
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
                
                // Animate stats if home section is in view
                if (entry.target.id === 'home') {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (not modal links)
            if (href.startsWith('#') && !href.includes('-details')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Show section
                showSection(targetId);
                
                // Smooth scroll
                smoothScrollToSection(targetId);
            }
        });
    });
    
    // Initialize
    showSection('home');
    initTypingEffect();
    
    // Add animation classes to elements
    document.querySelectorAll('.stat-card, .project-card, .activity-card, .value-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Add CSS for smooth scrolling behavior
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }
        }
    `;
    document.head.appendChild(style);
});