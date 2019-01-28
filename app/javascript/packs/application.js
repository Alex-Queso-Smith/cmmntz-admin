/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react';
import Redbox from 'redbox-react';
import { render } from 'react-dom';

import App from '../react/App';

document.addEventListener('DOMContentLoaded', () => {
  let app = document.getElementById('ca-app');

  if (app) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, app)
      } catch (e) {
        render(<RedBox error={e} />, app)
      }
    }
    else {
      render(<App />, app)
    }
  }
})
