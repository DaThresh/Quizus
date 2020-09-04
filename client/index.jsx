// Modules
import 'core-js';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { isLive } from './utilities/environment';
import { createBrowserHistory as createHistory } from 'history';
import ReactGA from 'react-ga';

// Styles
import './sass/imports.sass';

// Components
import App from './App';

// Globals
global.exam = {};
global.animal = '';

// Init analytics
const history = createHistory();
if(isLive()){
  ReactGA.initialize('UA-177052149-1');
  history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <Router history={history}>
    <App />
  </Router>,
  rootElement
);
