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
  let customerSettings = document.getElementById('cf-customer-settings');

  if (customerSettings) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, customerSettings)
      } catch (e) {
        render(<RedBox error={e} />, customerSettings)
      }
    }
    else {
      render(<App />, customerSettings)
    }
  }

  let artShow = document.getElementById('cf-art-show');

  if (artShow) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, artShow)
      } catch (e) {
        render(<RedBox error={e} />, artShow)
      }
    }
    else {
      render(<App />, artShow)
    }
  }

  let bannedUsers = document.getElementById('cf-banned-users-container')

  if (bannedUsers) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, bannedUsers)
      } catch (e) {
        render(<RedBox error={e} />, bannedUsers)
      }
    }
    else {
      render(<App />, bannedUsers)
    }
  }

  let memberManagement = document.getElementById('cf-member-management')

  if (memberManagement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, memberManagement)
      } catch (e) {
        render(<RedBox error={e} />, memberManagement)
      }
    }
    else {
      render(<App />, memberManagement)
    }
  }

  let usersContainer = document.getElementById('cf-users-container')

  if (usersContainer) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, usersContainer)
      } catch (e) {
        render(<RedBox error={e} />, usersContainer)
      }
    }
    else {
      render(<App />, usersContainer)
    }
  }


})
