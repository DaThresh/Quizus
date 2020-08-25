// Modules
import 'core-js';
import React from 'react';
import { render } from 'react-dom';

// Styles
import './sass/imports.sass';
import './sass/App.scss';

// Components
import Wrapper from './Wrapper';
import Topbar from './Topbar';
import Notifications from './Notifications';

// Socket
import setupSocket from './socket/api';

// Globals
global.exam = {};
global.questions = [];
global.messages = [];
global.animals = {};
global.animal = '';
global.unRead = 0;

setupSocket();

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <span>
    <Topbar />
    <Wrapper />
  </span>,
  rootElement
);
