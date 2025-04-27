document.addEventListener('DOMContentLoaded', function () {
    const elementosAnimados = document.querySelectorAll('.recursos-section h2, .recursos-item');

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

    // Animar al hacer scroll (opcional)
    window.addEventListener('scroll', checkVisibility);
});

let actualmenteAbierto = null; // Variable para rastrear el contenido actualmente abierto

function toggleReglamento(h4Element) {
    const contenido = h4Element.nextElementSibling;
    const arrowIcon = h4Element.querySelector('.arrow-icon');

    // Cerrar el elemento actualmente abierto si es diferente al que se va a abrir
    if (actualmenteAbierto && actualmenteAbierto !== contenido) {
        actualmenteAbierto.style.height = '0';
        const h4Abierto = actualmenteAbierto.previousElementSibling;
        if (h4Abierto) {
            h4Abierto.classList.remove('active');
            const arrowAbierto = h4Abierto.querySelector('.arrow-icon');
            if (arrowAbierto) {
                arrowAbierto.classList.remove('active');
            }
        }
        actualmenteAbierto = null; // Resetear la variable después de cerrar
    }

    // Abrir o cerrar el elemento actual
    if (contenido.style.height === '0px' || contenido.style.height === '') {
        contenido.style.height = contenido.scrollHeight + 'px';
        h4Element.classList.add('active');
        if (arrowIcon) {
            arrowIcon.classList.add('active');
        }
        actualmenteAbierto = contenido; // Actualizar el elemento actualmente abierto
    } else {
        contenido.style.height = '0px';
        h4Element.classList.remove('active');
        if (arrowIcon) {
            arrowIcon.classList.remove('active');
        }
        actualmenteAbierto = null; // Ningún elemento está abierto
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('mainNav');
    const stickyOffset = nav.offsetTop; // Obtiene la distancia del nav desde la parte superior

    function stickNav() {
        if (window.scrollY >= stickyOffset) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', stickNav);
});

let servicioActualmenteAbierto = null; // Variable para rastrear el servicio actualmente abierto

function toggleServicioDeportivo(element) {
    const contenido = element.nextElementSibling;
    const arrowIcon = element.querySelector('.arrow-icon');

    // Si hay un servicio actualmente abierto y no es el que se va a abrir, cerrarlo
    if (servicioActualmenteAbierto && servicioActualmenteAbierto !== contenido) {
        servicioActualmenteAbierto.style.height = '0';
        const h4Abierto = servicioActualmenteAbierto.previousElementSibling;
        if (h4Abierto) {
            h4Abierto.classList.remove('active');
            const arrowAbierto = h4Abierto.querySelector('.arrow-icon');
            if (arrowAbierto) {
                arrowAbierto.classList.remove('active');
            }
        }
        servicioActualmenteAbierto = null; // Resetear la variable después de cerrar
    }

    // Abrir o cerrar el servicio actual
    if (contenido.style.height === '0px' || contenido.style.height === '') {
        contenido.style.height = contenido.scrollHeight + 'px';
        element.classList.add('active');
        if (arrowIcon) {
            arrowIcon.classList.add('active');
        }
        servicioActualmenteAbierto = contenido; // Actualizar el servicio actualmente abierto
    } else {
        contenido.style.height = '0px';
        element.classList.remove('active');
        if (arrowIcon) {
            arrowIcon.classList.remove('active');
        }
        servicioActualmenteAbierto = null; // Ningún servicio está abierto
    }
}

