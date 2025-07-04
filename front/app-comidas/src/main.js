import { router } from './routes/router';

// Interceptar clics en los links internos
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    router();
  }
});

// Manejo del botón "atrás" y "adelante"
window.addEventListener('popstate', router);

// Carga inicial
document.addEventListener('DOMContentLoaded', router);

