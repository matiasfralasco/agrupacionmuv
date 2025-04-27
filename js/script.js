document.addEventListener('DOMContentLoaded', function () {
    // Carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const prevButton = carouselContainer.querySelector('.prev-button');
        const nextButton = carouselContainer.querySelector('.next-button');
        const memberInfos = carouselContainer.querySelectorAll('.team-member-info');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            memberInfos.forEach(info => info.classList.remove('active-info'));
            slides[index].classList.add('active');
            memberInfos[index].classList.add('active-info');
            currentIndex = index;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        showSlide(currentIndex);

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }

        // Opcional: Autoplay
        // setInterval(nextSlide, 3000);
    }


    // Observador de Intersección para las secciones
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll suave en la navegación con compensación para la barra pegajosa
    const nav = document.querySelector('nav#mainNav');
    let navHeight = nav ? nav.offsetHeight : 0;

    const updateNavHeight = () => {
        navHeight = nav ? nav.offsetHeight : 0;
    };
    window.addEventListener('resize', updateNavHeight);

    document.querySelectorAll('nav#mainNav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Barra de navegación pegajosa
    if (nav) {
        let isSticky = false;
        const offsetTop = nav.offsetTop;

        function handleScroll() {
            if (window.scrollY >= offsetTop && !isSticky) {
                nav.classList.add('sticky');
                isSticky = true;
                updateNavHeight();
            } else if (window.scrollY < offsetTop && isSticky) {
                nav.classList.remove('sticky');
                isSticky = false;
                updateNavHeight();
            }
        }

        window.addEventListener('scroll', handleScroll);
    }

    // Función para el FAQ
    window.toggleFAQ = function(h3Element) {
        const allQuestions = document.querySelectorAll('.faq-question');
        const allAnswers = document.querySelectorAll('.faq-answer');
        const currentAnswer = h3Element.nextElementSibling;
        const isCurrentlyOpen = currentAnswer.classList.contains('open');

        // Cierra todos los elementos ABIERTOS que no son el actual
        allQuestions.forEach(q => {
            if (q !== h3Element && q.classList.contains('active')) {
                q.classList.remove('active');
            }
        });
        allAnswers.forEach(a => {
            if (a !== currentAnswer && a.classList.contains('open')) {
                a.classList.remove('open');
            }
        });

        // Abre o cierra el elemento clickeado
        if (isCurrentlyOpen) {
            h3Element.classList.remove('active');
            currentAnswer.classList.remove('open');
        } else {
            h3Element.classList.add('active');
            currentAnswer.classList.add('open');
        }
    };

    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el enlace "#" recargue la página
            dropdownMenu.classList.toggle('open');
            dropdownToggle.classList.toggle('open');
        });

        // Cerrar el menú desplegable si se hace clic fuera de él
        document.addEventListener('click', function(event) {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('open');
                dropdownToggle.classList.remove('open');
            }
        });

        // **NUEVO:** Event listener para los enlaces dentro del menú desplegable
        dropdownMenu.addEventListener('click', function(event) {
            const target = event.target;
            if (target.tagName === 'A') {
                // Si el clic ocurrió en un enlace (<a>), permite la navegación normal
                if (target.href.startsWith('http') || target.href.startsWith('https')) {
                    window.open(target.href, '_blank'); // Abre enlaces externos en una nueva pestaña
                } else {
                    window.location.href = target.href; // Navegación interna normal
                }
            }
        });
    }
});