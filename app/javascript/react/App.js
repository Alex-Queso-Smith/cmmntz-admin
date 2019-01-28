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

class App extends React.Component {
  state = {
    customerId: document.getElementById('ca-app').getAttribute('data-customer-id'),
    customerName: document.getElementById('ca-app').getAttribute('data-customer-name')
  }

  updateAppData = this.updateAppData.bind(this);

  updateAppData(id, name){
    this.setState({
      customerId: id,
      customerName: name
    })
  }

  render(){
    var { customerId, customerName } = this.state;

    return(
      <Router>
          <NavBar customerId={customerId} customerName={customerName}>
            <Switch>
              <Route path='/login' render={ (props) => <SessionLoginContainer {...props} updateAppData={this.updateAppData} /> }  />
              <Route path='/customer_sessions' render={ (props) => <SessionLoginContainer {...props} updateAppData={this.updateAppData} />} />
              <Route path='/galleries/:id' component={GalleryShowContainer} />
              <Route path='/arts/:id' component={ArtsShowContainer} />
              <Route path='/arts' component={ArtsIndexContainer} />
              <Route path='/gallery_blacklistings' component={BannedUsersContainer} />
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
