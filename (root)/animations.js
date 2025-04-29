// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Add Typed.js for dynamic text animation
    const typed = new Typed('.typed-text', {
      strings: [
        'Software Developer',
        'Frontend Developer',
        'Problem Solver',
        'Aspiring Web Designer'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });
  
    // Add 3D background effect
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-bg').appendChild(renderer.domElement);
  
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    camera.position.z = 30;
  
    function animate() {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  
    // Window resize handler for 3D background
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  
    // Add code highlighting for project demos
    Prism.highlightAll();
  
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // Theme toggle functionality
    const checkbox = document.getElementById('checkbox');
    const themeLabel = document.querySelector('.theme-label');
    
    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-mode');
      checkbox.checked = true;
      themeLabel.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark-mode');
      themeLabel.textContent = 'Dark Mode';
    }
    
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeLabel.textContent = 'Light Mode';
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeLabel.textContent = 'Dark Mode';
      }
    });
  
    // Add event listener to the cat logo in the header
    const catLogo = document.querySelector('.logo img');
    if (catLogo) {
      const updateCatLogo = () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        catLogo.src = isDarkMode ? 'assets/cat2.png' : 'assets/ming.png';
      };
    
      catLogo.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateCatLogo();
      });
    
      // Update logo on page load based on theme
      updateCatLogo();
    }
  
    // Initialize particles.js
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#dc2626'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#dc2626',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  
    // Custom cursor
    const cursor = document.getElementById('cursor');
    if (cursor) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
      
      // Add hover effect to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .tech-item, .skill-item');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursor.style.border = '2px solid var(--primary-color)';
          cursor.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.border = '2px solid var(--primary-color)';
          cursor.style.backgroundColor = 'transparent';
        });
      });
    }
  
    // Sticky header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Navigation indicator
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    
    if (navLinks.length && navIndicator) {
      function updateNavIndicator(link) {
        navIndicator.style.width = `${link.offsetWidth}px`;
        navIndicator.style.left = `${link.offsetLeft}px`;
        navIndicator.style.opacity = '1';
      }
      
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
          updateNavIndicator(link);
        });
      });
      
      const navList = document.querySelector('.nav-list');
      navList.addEventListener('mouseleave', () => {
        // Find active link or default to first
        const activeLink = document.querySelector('.nav-link.active') || navLinks[0];
        if (activeLink) {
          updateNavIndicator(activeLink);
        } else {
          navIndicator.style.opacity = '0';
        }
      });
      
      // Set initial state based on current section
      function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
          const sectionTop = section.offsetTop - 200;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
                updateNavIndicator(link);
              }
            });
          }
        });
      }
      
      window.addEventListener('scroll', setActiveNavLink);
      window.addEventListener('load', setActiveNavLink);
    }
  
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerSkills = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute('data-progress');
          setTimeout(() => {
            entry.target.style.width = progress;
          }, 300);
          observerSkills.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
      observerSkills.observe(bar);
    });
  
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const count = parseInt(counter.innerText);
          const increment = Math.trunc(target / speed);
          
          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(() => {
              handleIntersect([{ isIntersecting: true, target: counter }], null);
            }, 1);
          } else {
            counter.innerText = target;
          }
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
  
    // GSAP animations
    // Hero section parallax effect
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to('.hero-image', {
      y: 50,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Animate project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('img'), {
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('img'), {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
    
    // Animate tech item icons
    gsap.from('.tech-item i', {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.tech-stack',
        start: 'top 80%'
      }
    });
    
    // Animate stats
    gsap.from('.stat-item', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.stats-container',
        start: 'top 80%'
      }
    });
    
    // Button hover animations
    const buttons = document.querySelectorAll('.btn, .contact-btn, .view-all');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          y: -3,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          duration: 0.3
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          y: 0,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          duration: 0.3
        });
      });
    });
    
    // Text reveal animation for section titles
    gsap.utils.toArray('.section-title h2').forEach(title => {
      gsap.from(title, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: 'top 80%'
        }
      });
    });
    
    // Scroll-triggered animations for contact section
    gsap.from('.contact-content h2', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%'
      }
    });
    
    gsap.from('.contact-content p', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%'
      }
    });
    
    gsap.from('.contact-btn', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%'
      }
    });
  
    // Scroll down arrow bounce animation
    gsap.to('.btn-primary i', {
      y: 6,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut'
    });
  
    // Project detail reveal animations for modals
    const modalLinks = document.querySelectorAll('a[href^="#"][href$="-modal"]');
    modalLinks.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(() => {
          const targetId = link.getAttribute('href').substring(1);
          const modalContent = document.getElementById(targetId).querySelector('.modal-content');
          
          if (modalContent) {
            gsap.from(modalContent.querySelectorAll('h2, .modal-description, .project-details, .project-images-grid img'), {
              y: 30,
              opacity: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out'
            });
          }
        }, 300);
      });
    });

    // Add event listener to the footer logo
    const footerLogo = document.querySelector('.footer-logo img');
    if (footerLogo) {
      const updateFooterLogo = () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        footerLogo.src = isDarkMode ? 'assets/cat2.png' : 'assets/ming.png';
      };
    
      // Update footer logo on page load based on theme
      updateFooterLogo();
    
      // Update footer logo when theme changes
      document.body.addEventListener('classChange', updateFooterLogo);
    }
  });