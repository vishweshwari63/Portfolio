// Portfolio Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('.section');
    const contactForm = document.getElementById('contact-form');
    const downloadResumeBtn = document.getElementById('download-resume');
    const viewWorkBtn = document.querySelector('a[href="#projects"]');

    // Mobile Navigation Toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active');
    }

    // Close mobile menu when clicking on a link
    function closeMobileMenu() {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
    }

    // Event listeners for mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    if (navClose) {
        navClose.addEventListener('click', closeMobileMenu);
    }

    // Header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY >= 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // Smooth scrolling function
    function smoothScrollTo(targetElement) {
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Add smooth scrolling to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                smoothScrollTo(targetSection);
                closeMobileMenu(); // Close mobile menu if open
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active-link'));
                this.classList.add('active-link');
            }
        });
    });

    // Add smooth scrolling to "View My Work" button
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                smoothScrollTo(projectsSection);
            }
        });
    }

    // Active link highlighting based on scroll position
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 50;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const textArray = [
        'Computer Science Student',
        'Aspiring Software Developer', 
        'Problem Solver',
        'Tech Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        if (!typingText) return;
        
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before typing next text
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing animation
    setTimeout(typeWriter, 1000);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate child elements with delay
                const animatedElements = entry.target.querySelectorAll('.skill__item, .highlight, .project__card, .contact__card, .project__content');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Form Validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(field, errorMessage) {
        field.classList.add('error');
        const existingError = field.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        errorElement.textContent = errorMessage;
        field.parentNode.appendChild(errorElement);
    }

    function showFormMessage(message, isSuccess = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `status ${isSuccess ? 'status--success' : 'status--error'}`;
        messageDiv.textContent = message;
        messageDiv.style.marginTop = 'var(--space-16)';
        
        // Remove existing messages
        const existingMessage = contactForm.querySelector('.status');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        contactForm.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;

        // Remove previous error messages and styling
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('error', 'success');
        });

        // Validate name
        if (!name || name.value.trim().length < 2) {
            showFieldError(name, 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            name.classList.add('success');
        }

        // Validate email
        if (!email || !validateEmail(email.value.trim())) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            email.classList.add('success');
        }

        // Validate subject
        if (!subject || subject.value.trim().length < 3) {
            showFieldError(subject, 'Subject must be at least 3 characters long');
            isValid = false;
        } else {
            subject.classList.add('success');
        }

        // Validate message
        if (!message || message.value.trim().length < 10) {
            showFieldError(message, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            message.classList.add('success');
        }

        return isValid;
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showFormMessage('Thank you for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                    document.querySelectorAll('.form-control').forEach(input => {
                        input.classList.remove('error', 'success');
                    });
                    
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1200);
            }
        });

        // Real-time form validation
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Remove error styling while typing
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.form-error');
                if (errorElement) {
                    errorElement.remove();
                }
            });
        });
    }

   // Resume download functionality (robust, uses exact uploaded file path)
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Use the exact local path you uploaded (the environment will transform this to a URL)
        const localPath = "../vishweshwari_resume.pdf";

        // Encode the path to handle spaces/parentheses
        const encodedPath = encodeURI(localPath);

        // Try fetching the PDF (preferred) then open blob URL
        fetch(encodedPath)
            .then(resp => {
                if (!resp.ok) throw new Error('Network response not ok');
                return resp.blob();
            })
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);

                // Try open in new tab
                const newTab = window.open(blobUrl, "_blank");
                if (!newTab) {
                    // Popup blocked -> force download
                    const a = document.createElement("a");
                    a.href = blobUrl;
                    a.download = "Vishweshwari_Resume.pdf";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }

                // Clean up after 1 minute
                setTimeout(() => URL.revokeObjectURL(blobUrl), 60 * 1000);
            })
            .catch(err => {
                console.warn("Fetch failed, attempting direct open or encoded download:", err);
                // Fallback: try to open encoded path directly
                try {
                    const newTab = window.open(encodedPath, "_blank");
                    if (!newTab) {
                        // force download fallback
                        const a = document.createElement("a");
                        a.href = encodedPath;
                        a.download = "Vishweshwari_Resume.pdf";
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }
                } catch (e) {
                    console.error("Final fallback failed:", e);
                    alert("Could not open the resume automatically. Please download it from the file manager or contact me.");
                }
            });
    });
}

    // Add loading animation for elements
    function initializeAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .btn--success {
                background-color: var(--color-success) !important;
            }
        `;
        document.head.appendChild(style);
    }

    initializeAnimations();

    // Parallax effect for hero section (subtle)
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const homeImg = document.querySelector('.home__blob');
        
        if (homeImg && scrolled < window.innerHeight && window.innerWidth > 768) {
            homeImg.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply throttling to scroll handlers
    window.addEventListener('scroll', throttle(handleHeaderScroll, 16));
    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    window.addEventListener('scroll', throttle(handleParallax, 16));

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});
