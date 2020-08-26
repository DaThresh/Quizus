// Modules
import 'core-js';
import React from 'react';
import { render } from 'react-dom';

// Styles
import './sass/imports.sass';

// Components
import App from './App';
import Modal from './Modal';

// Globals
global.exam = {};
global.questions = [];
global.messages = [];
global.animals = {};
global.animal = '';
global.unRead = 0;

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <span>
    <App />
    <Modal />
  </span>,
  rootElement
);
