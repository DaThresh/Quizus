import 'core-js';
import React from 'react';
import { render } from 'react-dom';

import './index.css';

const rootElement = document.createElement('div');
rootElement.className = 'root';
document.body.appendChild(rootElement);

render(
  <React.StrictMode>
    Working!
  </React.StrictMode>,
  rootElement
);
