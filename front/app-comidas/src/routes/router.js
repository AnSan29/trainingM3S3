import Home from '../views/home.js';
import About from '../views/about.js';
import NotFound from '../views/notFound.js';
import ApiUi, { apiUiController } from '../views/apiUi.js';

const routes = {
  '/': Home,
  '/about': About,
  '/apiUi': ApiUi,
};

export function router() {
  const path = window.location.pathname;
  const view = routes[path] || NotFound;

  document.getElementById('app').innerHTML = view();

  //si nuestra locacion es /apiUi entonces ejecutamos el controller para la logica despues de haber montado el html
  if(path === '/apiUi'){
    apiUiController();
  }
}