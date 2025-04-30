document.addEventListener('DOMContentLoaded', function () {
    // 1. DETECCIÓN DE MÓVIL (NO afecta escritorio)
    function isMotorolaG9Play() {
        // Solo se activa en dispositivos con ancho <= 480px (no afecta escritorio)
        return window.innerWidth <= 480;
    }

    // 2. CARRUSEL (funcionalidad original intacta)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const prevButton = carouselContainer.querySelector('.prev-button');
        const nextButton = carouselContainer.querySelector('.next-button');
        const memberInfos = carouselContainer.querySelectorAll('.team-member-info');
        let currentIndex = 0;

        // FUNCIONES ORIGINALES (sin cambios)
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

        // INICIALIZACIÓN ORIGINAL
        showSlide(currentIndex);

        // CONTROLES ORIGINALES
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);

            // ► SOLO CAMBIO PARA MÓVIL (Motorola G9 Play)
            if (isMotorolaG9Play()) {
                // Botones más grandes solo en móvil
                [prevButton, nextButton].forEach(btn => {
                    btn.style.padding = '18px';
                    btn.style.fontSize = '1.8rem';
                });

                // Agregar soporte táctil (no afecta escritorio)
                let touchStartX = 0;
                carouselContainer.addEventListener('touchstart', e => {
                    touchStartX = e.touches[0].clientX;
                }, {passive: true});

                carouselContainer.addEventListener('touchend', e => {
                    const touchEndX = e.changedTouches[0].clientX;
                    if (touchStartX - touchEndX > 50) nextSlide();
                    if (touchEndX - touchStartX > 50) prevSlide();
                }, {passive: true});
            }
        }
    }

    // 3. INTERSECTION OBSERVER (comportamiento original intacto)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: isMotorolaG9Play() ? 0.05 : 0.1 // Umbral más sensible solo en móvil
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 4. SCROLL SUAVE / NAVEGACIÓN (MODIFICADO)
    const nav = document.querySelector('nav#mainNav');
    let navHeight = nav ? nav.offsetHeight : 0;

    const updateNavHeight = () => {
        navHeight = nav ? nav.offsetHeight : 0;
    };

    window.addEventListener('resize', updateNavHeight);

    document.querySelectorAll('nav#mainNav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                // Es un ancla en la misma página
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = targetPosition - navHeight;

                    const scrollOptions = {
                        top: isMotorolaG9Play() ? offsetPosition - 10 : offsetPosition,
                        behavior: 'smooth'
                    };

                    window.scrollTo(scrollOptions);

                    if (isMotorolaG9Play()) {
                        const dropdown = document.querySelector('.dropdown-menu.open');
                        if (dropdown) dropdown.classList.remove('open');
                    }
                } else {
                    console.warn('Elemento objetivo no encontrado:', targetId);
                    // Si el elemento no se encuentra, permite la navegación normal (por si acaso)
                    window.location.href = href;
                }
            }
            // Si no empieza con #, es un enlace a otra página, y no hacemos nada (navegación normal)
        });
    });

// 5. STICKY NAV (comportamiento original intacto)
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

    // ► OPTIMIZACIÓN SCROLL SOLO PARA MÓVIL
    window.addEventListener('scroll', 
        handleScroll, 
        //isMotorolaG9Play() ? {passive: true} : false
         {passive: true}  //Modificado para que sea sticky en todos los dispositivos
    );
}

    // 6. FAQ (funcionalidad original intacta)
    window.toggleFAQ = function(h3Element) {
        const allQuestions = document.querySelectorAll('.faq-question');
        const allAnswers = document.querySelectorAll('.faq-answer');
        const currentAnswer = h3Element.nextElementSibling;
        const isCurrentlyOpen = currentAnswer.classList.contains('open');

        // Comportamiento original sin cambios
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

        // Toggle original
        h3Element.classList.toggle('active');
        currentAnswer.classList.toggle('open');

        // ► MEJORA SOLO PARA MÓVIL
        if (isMotorolaG9Play() && !isCurrentlyOpen) {
            setTimeout(() => {
                h3Element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
            }, 100);
        }
    };

    // 7. DROPDOWN "MÁS" (funcionalidad original intacta)
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        // Comportamiento original
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('open');
            dropdownToggle.classList.toggle('open');
        });

        // Cierre al hacer clic fuera (original)
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('open');
                dropdownToggle.classList.remove('open');
            }
        });

        // ► OPTIMIZACIÓN SOLO PARA MÓVIL
        if (isMotorolaG9Play()) {
            dropdownMenu.style.width = '100%';
            dropdownMenu.style.left = '0';
            dropdownMenu.querySelectorAll('a').forEach(link => {
                link.style.padding = '12px 15px';
            });
        }
    }
    // 8. MODO OSCURO (Persistencia con localStorage)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const lightModeIcon = document.getElementById('light-mode-icon');
    const darkModeText = document.getElementById('dark-mode-text');

    // Función para activar/desactivar el modo oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');

        // Alternar íconos y texto
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.style.display = 'none';
            lightModeIcon.style.display = 'inline-block';
            darkModeText.textContent = 'Modo Claro';
            localStorage.setItem('darkMode', 'enabled'); // Guardar preferencia
        } else {
            darkModeIcon.style.display = 'inline-block';
            lightModeIcon.style.display = 'none';
            darkModeText.textContent = 'Modo Oscuro';
            localStorage.setItem('darkMode', 'disabled'); // Guardar preferencia
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);

        // Verificar la preferencia al cargar la página
        if (localStorage.getItem('darkMode') === 'enabled') {
            toggleDarkMode(); // Activar el modo oscuro
        }
    }
});
