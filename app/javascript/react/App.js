import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import GallerySettingsContainer from './containers/GallerySettingsContainer';
import ArtsShowContainer from './containers/ArtsShowContainer';
import BannedUsersContainer from './containers/BannedUsersContainer';
import MemberManagementContainer from './containers/MemberManagementContainer';

class App extends React.Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route path='/galleries/:id/edit' component={GallerySettingsContainer} />
          <Route path='/arts/:id' component={ArtsShowContainer} />
          <Route path='/gallery_blacklistings' component={BannedUsersContainer} />
          <Route path='/members' component={MemberManagementContainer} />
        </Switch>
      </Router>
    )
  }
}

export default App;
