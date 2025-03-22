/**
 * Royal Rummy Website JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');

            // Change icon when menu is open
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Add animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.feature-card, .game-card, .testimonial');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };

    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Form submission prevention (for demo)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // 这里可以添加表单提交的逻辑，例如AJAX请求
                // 为了演示，我们只显示一个成功消息
                emailInput.value = '';

                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 5px; padding: 1rem; margin-top: 1rem;">
                        <i class="fas fa-check-circle" style="color: #2ecc71; margin-right: 0.5rem;"></i>
                        <span>感谢您的订阅！请查收确认邮件。</span>
                    </div>
                `;

                formContainer.appendChild(successMessage);

                // 5秒后移除成功消息
                setTimeout(() => {
                    formContainer.removeChild(successMessage);
                }, 5000);
            }
        });
    }

    // Update active navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            } else if (current === '' && link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial check

    // Add CSS class for animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .feature-card, .game-card, .testimonial {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .main-nav.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 1rem;
                z-index: 1000;
            }
            
            .main-nav.active li {
                margin: 0.5rem 0;
            }
        </style>
    `);

    // 互动按钮功能
    const startNowBtn = document.getElementById('startNow');
    const interactScreen = document.getElementById('interactWithScreen');

    if (startNowBtn && interactScreen) {
        startNowBtn.addEventListener('click', function () {
            interactScreen.classList.remove('active');
        });
    }

    // 移动端互动按钮
    const startNowMobileBtn = document.getElementById('startNowMobile');
    const interactScreenMobile = document.getElementById('interactWithScreenMobile');

    if (startNowMobileBtn && interactScreenMobile) {
        startNowMobileBtn.addEventListener('click', function () {
            interactScreenMobile.classList.remove('active');
        });
    }

    // 视差效果
    const butter = {
        init: function (options) {
            const defaults = {
                wrapperId: 'butter',
                wrapperDamper: 0.07,
                cancelOnTouch: false
            };
            this.options = Object.assign({}, defaults, options);
            this.wrapper = document.getElementById(this.options.wrapperId);

            if (!this.wrapper) {
                return;
            }

            this.scroller = window;
            this.wrapperOffset = 0;
            this.animateId = null;
            this.resizing = false;
            this.active = true;
            this.wrapperHeight = this.wrapper.offsetHeight;
            this.bodyHeight = document.body.offsetHeight;

            this.refresh();
            this.setupEvents();
            this.animate();
        },

        setupEvents: function () {
            if (this.options.cancelOnTouch) {
                document.body.addEventListener('touchstart', this.cancel.bind(this));
            }
            window.addEventListener('resize', this.resize.bind(this));
            window.addEventListener('scroll', this.scroll.bind(this));
        },

        resize: function () {
            this.resizing = true;
        },

        scroll: function () {
            if (this.active) {
                this.wrapperOffset = window.pageYOffset * 0.1;
            }
        },

        animate: function () {
            if (this.resizing) {
                this.refresh();
                this.resizing = false;
            }

            if (this.active) {
                this.wrapper.style.transform = 'translateY(-' + this.wrapperOffset + 'px)';
            }

            this.animateId = requestAnimationFrame(this.animate.bind(this));
        },

        cancel: function () {
            if (this.active) {
                cancelAnimationFrame(this.animateId);
                window.removeEventListener('resize', this.resize.bind(this));
                window.removeEventListener('scroll', this.scroll.bind(this));
                this.wrapper.removeAttribute('style');
                this.active = false;
            }
        },

        refresh: function () {
            this.wrapperHeight = this.wrapper.offsetHeight;
            this.bodyHeight = document.body.offsetHeight;
        }
    };

    // 初始化owlCarousel，如果存在
    if (typeof $.fn.owlCarousel !== 'undefined') {
        $('.products-slider.owl-carousel').owlCarousel({
            margin: 10,
            items: 1,
            dots: false,
            autoWidth: false,
            nav: true,
            navText: ["<div class='nav-btn prev-slide'><i class='fas fa-chevron-left'></i></div>", "<div class='nav-btn next-slide'><i class='fas fa-chevron-right'></i></div>"],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    autoWidth: true,
                },
                1000: {
                    items: 3,
                    nav: true,
                    autoWidth: true,
                }
            }
        });
    }

    // 初始化WOW.js，如果存在
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
});

// 如果butter对象存在，初始化视差效果
if (typeof butter !== 'undefined') {
    butter.init({
        cancelOnTouch: true
    });
} 