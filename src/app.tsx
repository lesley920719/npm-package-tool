import React from 'react';
import { render } from 'react-dom';
import Router from './pageRouter';

import './base.scss';

render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
