document.addEventListener('DOMContentLoaded', function () {
    const elementosAnimados = document.querySelectorAll('.novedades h2, .novedad-item, .eventos-proximos h2, .evento-item');

    function checkVisibility() {
        elementosAnimados.forEach(elemento => {
            const rect = elemento.getBoundingClientRect();
            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight) || (rect.bottom >= 0 && rect.top <= window.innerHeight);
            if (isVisible) {
                elemento.classList.add('visible');
            }
        });
    }

    // Animar al cargar la página
    checkVisibility();

    // Animar al hacer scroll
    window.addEventListener('scroll', checkVisibility);

    const nav = document.getElementById('mainNav');
    const header = document.querySelector('header');

    // Función para manejar la barra de navegación sticky
    function handleStickyNav() {
        if (window.scrollY > header.offsetHeight) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    }

    // Ejecutar la función al cargar la página para el estado inicial de la sticky nav
    handleStickyNav();

    // Ejecutar la función cada vez que el usuario hace scroll para la sticky nav
    window.addEventListener('scroll', handleStickyNav);

    // --- INICIO: Código para el Lightbox con Navegación Circular ---
    const lightbox = document.getElementById('lightbox');
    const imagenLightbox = document.getElementById('imagen-lightbox');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');
    const imagenesGaleria = document.querySelectorAll('.galeria-fotos .novedad-item a');
    const prevButtonLightbox = document.querySelector('.lightbox-control.prev');
    const nextButtonLightbox = document.querySelector('.lightbox-control.next');
    let currentIndexLightbox = 0;
    const totalImagenes = imagenesGaleria.length;

    if (imagenesGaleria) {
        imagenesGaleria.forEach((imagenLink, index) => {
            imagenLink.addEventListener('click', function (e) {
                e.preventDefault();
                const imagenSrc = this.getAttribute('href');
                imagenLightbox.src = imagenSrc;
                lightbox.style.display = 'flex';
                currentIndexLightbox = index; // Guarda el índice de la imagen abierta
            });
        });
    }

    function mostrarImagenLightbox(index) {
        if (totalImagenes > 0) {
            currentIndexLightbox = (index + totalImagenes) % totalImagenes; // Calcula el índice circularmente
            const imagenSrc = imagenesGaleria[currentIndexLightbox].getAttribute('href');
            imagenLightbox.src = imagenSrc;
        }
    }

    if (prevButtonLightbox) {
        prevButtonLightbox.addEventListener('click', function () {
            mostrarImagenLightbox(currentIndexLightbox - 1);
        });
    }

    if (nextButtonLightbox) {
        nextButtonLightbox.addEventListener('click', function () {
            mostrarImagenLightbox(currentIndexLightbox + 1);
        });
    }

    if (cerrarLightbox) {
        cerrarLightbox.addEventListener('click', function () {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                lightbox.style.display = 'none';
            }
        });
    }
    // --- FIN: Código para el Lightbox con Navegación Circular ---
});

const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
    const wrapper = carousel.querySelector('.carousel-wrapper');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    const items = wrapper.children;
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
    const totalWidth = itemWidth * items.length;

    wrapper.style.width = totalWidth + 'px';

    function scrollToItem(index) {
        wrapper.style.transform = `translateX(-${index * itemWidth}px)`;
        currentIndex = index;
    }

    function nextSlide() {
        if (currentIndex < items.length - 1) {
            scrollToItem(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            scrollToItem(currentIndex - 1);
        }
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    // Opcional: Deslizar automáticamente cada cierto tiempo
    // let autoSlideInterval = setInterval(nextSlide, 5000);
    // carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    // carousel.addEventListener('mouseleave', () => autoSlideInterval = setInterval(nextSlide, 5000));
});