import { loginTmpl, notFoundTmpl, serverErrorTmpl, siginTmpl } from './pages';

import './style.scss';

const routes = {
    '/login': loginTmpl,
    '/404': notFoundTmpl,
    '/505': serverErrorTmpl,
    '/signin': siginTmpl,
}

window.onload = () => {
    const pathName = window.location.pathname;
    const template = Object.keys(routes).includes(pathName) ? routes[pathName] : null;
    if (template) {
        document.querySelector('.root').innerHTML = template;
    } else {
        //TODO: window.open()
        document.querySelector('.root').innerHTML = notFoundTmpl;
    }
}
