import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import GalleryShowContainer from './containers/gallery/GalleryShowContainer';
import ArtsIndexContainer from './containers/articles/ArtsIndexContainer';
import ArtsShowContainer from './containers/articles/ArtsShowContainer';
import BannedUsersContainer from './containers/gallery/BannedUsersContainer';
import MemberManagementContainer from './containers/members/MemberManagementContainer';
import EditMemberContainer from './containers/members/EditMemberContainer';

import SessionLoginContainer from './containers/sessions/SessionLoginContainer';
import GalleryArtistEditContainer from './containers/members/GalleryArtistEditContainer';
import CurrentUsersContainer from './containers/CurrentUsersContainer';
import SignupContainer from './containers/SignupContainer';
import DashboardContainer from './containers/DashboardContainer';
import NavBar from './containers/navigation/NavBar';

class App extends React.Component {
  state = {
    customerId: document.getElementById('ca-app').getAttribute('data-customer'),
    customerName: document.getElementById('ca-app').getAttribute('data-customer-name')
  }

  render(){
    return(
      <Router>
          <NavBar>
            <Switch>
              <Route path='/customer_sessions' component={SessionLoginContainer} />
              <Route path='/login' component={SessionLoginContainer} />
              <Route path='/galleries/:id' component={GalleryShowContainer} />
              <Route path='/arts/:id' component={ArtsShowContainer} />
              <Route path='/arts' component={ArtsIndexContainer} />
              <Route path='/gallery_blacklistings' component={BannedUsersContainer} />
              <Route path='/members/:id/edit' component={EditMemberContainer} />
              <Route path='/members' component={MemberManagementContainer} />
              <Route path='/gallery_artists/:id/edit' component={GalleryArtistEditContainer} />
              <Route path='/users' component={CurrentUsersContainer} />
              <Route path='/signup' component={SignupContainer} />
              <Route path='/' component={DashboardContainer} />
            </Switch>
          </NavBar>
      </Router>
    )
  }
}

export default App;
