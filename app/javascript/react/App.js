import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import GalleryShowContainer from './containers/gallery/GalleryShowContainer';
import ArtsIndexContainer from './containers/articles/ArtsIndexContainer';
import ArtsShowContainer from './containers/articles/ArtsShowContainer';
import BannedUsersContainer from './containers/gallery/BannedUsersContainer';
import MemberManagementContainer from './containers/members/MemberManagementContainer';
import SessionLoginContainer from './containers/sessions/SessionLoginContainer';
import GalleryArtistEditContainer from './containers/members/GalleryArtistEditContainer';
import CurrentUsersContainer from './containers/CurrentUsersContainer';
import SignupContainer from './containers/SignupContainer';
import DashboardContainer from './containers/DashboardContainer';
import NavBar from './containers/navigation/NavBar';
import ModerationCommentsContainer from './containers/moderation/ModerationCommentsContainer';

class App extends React.Component {
  state = {
    customerId: document.getElementById('ca-app').getAttribute('data-customer-id'),
    customerName: document.getElementById('ca-app').getAttribute('data-customer-name'),
    gallery: document.getElementById('ca-app').getAttribute('data-customer-gallery')
  }

  updateAppData = this.updateAppData.bind(this);

  updateAppData(id, name, gallery){
    this.setState({
      customerId: id,
      customerName: name,
      gallery: gallery
    })
  }

  render(){
    var { customerId, customerName, gallery } = this.state;

    return(
      <Router>
          <NavBar customerId={customerId} customerName={customerName} gallery={gallery}>
            <Switch>

              // settings
              <Route path='/galleries/:id' component={GalleryShowContainer} />
              <Route path='/gallery_blacklistings' component={BannedUsersContainer} />
              <Route path='/members' component={MemberManagementContainer} />
              <Route path='/gallery_artists/:id/edit' component={GalleryArtistEditContainer} />

              // Threads
              <Route path='/arts/:id' component={ArtsShowContainer} />
              <Route path='/arts' component={ArtsIndexContainer} />

              // Users
              <Route path='/users' component={CurrentUsersContainer} />

              // moderation
              <Route path='/moderation' component={ModerationCommentsContainer} />

              // special routes
              <Route path='/signup' component={SignupContainer} />
              <Route path='/login' render={ (props) => <SessionLoginContainer {...props} updateAppData={this.updateAppData} /> }  />
              <Route path='/customer_sessions' render={ (props) => <SessionLoginContainer {...props} updateAppData={this.updateAppData} />} />
              
              // root
              <Route path='/' component={DashboardContainer} />
            </Switch>
          </NavBar>
      </Router>
    )
  }
}

export default App;
