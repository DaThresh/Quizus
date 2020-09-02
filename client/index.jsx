// Modules
import 'core-js';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';

// Styles
import './sass/imports.sass';

// Components
import App from './App';
import Modal from './Modal';

// Globals
global.exam = {};
global.animal = '';

// Init analytics
ReactGA.initialize('UA-177052149-1');

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <Router>
    <App />
    <Modal />
  </Router>,
  rootElement
);
