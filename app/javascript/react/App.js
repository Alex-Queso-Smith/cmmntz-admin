import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


// Threads
import ArtsIndexContainer from './containers/threads/ArtsIndexContainer';
import ArtsShowContainer from './containers/threads/ArtsShowContainer';

// Users
import CurrentUsersContainer from './containers/CurrentUsersContainer';

// Moderation
import ModerationCommentsContainer from './containers/moderation/ModerationCommentsContainer';

// Settings
import MemberManagementContainer from './containers/members/MemberManagementContainer';
import GalleryShowContainer from './containers/gallery/GalleryShowContainer';
import SettingsBaseContainer from './containers/settings/SettingsBaseContainer'
import BannedUsersContainer from './containers/gallery/BannedUsersContainer';
import GalleryArtistEditContainer from './containers/members/GalleryArtistEditContainer';

// Help
import HelpBaseContainer from './containers/help/HelpBaseContainer';
import EmbedContainer from './containers/help/EmbedContainer';
import ModerationHelpContainer from './containers/help/ModerationHelpContainer';
import FaqContainer from './containers/help/FaqContainer';

// specials
import NavBar from './containers/navigation/NavBar';
import SignupContainer from './containers/SignupContainer';
import DashboardContainer from './containers/DashboardContainer';
import SessionLoginContainer from './containers/sessions/SessionLoginContainer';

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
              <Route path='/threads/:id' component={ArtsShowContainer} />
              <Route path='/threads' component={ArtsIndexContainer} />

              // Users
              <Route path='/users' component={CurrentUsersContainer} />

              // moderation
              <Route path='/moderation' component={ModerationCommentsContainer} />

              // Settings
              <Route path='/settings' component={SettingsBaseContainer} />

              // Help
              <Route path='/help/embed' component={EmbedContainer} />
              <Route path='/help/moderation' component={ModerationHelpContainer} />
              <Route path='/help/faq' component={FaqContainer} />
              <Route path='/help' component={HelpBaseContainer} />

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
