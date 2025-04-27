document.addEventListener('DOMContentLoaded', function () {
    const seccionesNotas = document.querySelectorAll('.notas-section h2, .notas-categoria');

    function checkVisibilityNotas() {
        seccionesNotas.forEach(elemento => {
            const rect = elemento.getBoundingClientRect();
            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight) || (rect.bottom >= 0 && rect.top <= window.innerHeight);
            if (isVisible) {
                elemento.classList.add('visible');
            }
        });
    }

    // Animar al cargar la página
    checkVisibilityNotas();

    // Animar al hacer scroll (opcional)
    window.addEventListener('scroll', checkVisibilityNotas);
});

let actualmenteAbiertoNota = null; // Variable para rastrear el contenido actualmente abierto

function toggleNotas(h3Element) {
    const contenido = h3Element.nextElementSibling;
    const arrowIcon = h3Element.querySelector('.arrow-icon');

    // Cerrar el elemento actualmente abierto si es diferente al que se va a abrir
    if (actualmenteAbiertoNota && actualmenteAbiertoNota !== contenido) {
        actualmenteAbiertoNota.classList.remove('expanded');
        const h3Abierto = actualmenteAbiertoNota.previousElementSibling;
        if (h3Abierto) {
            h3Abierto.classList.remove('active');
            const arrowAbierto = h3Abierto.querySelector('.arrow-icon');
            if (arrowAbierto) {
                arrowAbierto.classList.remove('active');
            }
        }
        actualmenteAbiertoNota = null; // Resetear la variable después de cerrar
    }

    // Abrir o cerrar el elemento actual
    if (!contenido.classList.contains('expanded')) {
        contenido.classList.add('expanded');
        h3Element.classList.add('active');
        if (arrowIcon) {
            arrowIcon.classList.add('active');
        }
        actualmenteAbiertoNota = contenido; // Actualizar el elemento actualmente abierto
    } else {
        contenido.classList.remove('expanded');
        h3Element.classList.remove('active');
        if (arrowIcon) {
            arrowIcon.classList.remove('active');
        }
        actualmenteAbiertoNota = null; // Ningún elemento está abierto
    }
}

// Función para observar las secciones y añadir la clase 'visible' cuando estén en el viewport
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Dejar de observar una vez que es visible
        }
    });
}, {
    threshold: 0.1 // Cambia este valor para ajustar cuándo se considera visible
});

sections.forEach(section => {
    observer.observe(section);
});
