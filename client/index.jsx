// Modules
import 'core-js';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { isLive } from './utilities/environment';
import ReactGA from 'react-ga';

// Styles
import './sass/imports.sass';

// Components
import App from './App';

// Globals
global.exam = {};
global.animal = '';

// Init analytics
if(isLive()) ReactGA.initialize('UA-177052149-1');

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <Router>
    <App />
  </Router>,
  rootElement
);
