document.addEventListener('DOMContentLoaded', function () {
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