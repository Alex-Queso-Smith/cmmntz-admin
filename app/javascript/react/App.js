import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


// Threads
import ArtsIndexContainer from './containers/threads/ArtsIndexContainer';
import ArtsShowContainer from './containers/threads/ArtsShowContainer';

// Users
import CurrentUsersContainer from './containers/CurrentUsersContainer';

// Moderation
import ModerationBaseContainer from './containers/moderation/ModerationBaseContainer';
import ModerationCommentsContainer from './containers/moderation/ModerationCommentsContainer';
import ModeratorsContainer from './containers/moderation/ModeratorsContainer';

// Settings
import SettingsBaseContainer from './containers/settings/SettingsBaseContainer'
import SiteSettingsContainer from './containers/settings/SiteSettingsContainer'
import ThreadsSettingsContainer from './containers/settings/ThreadsSettingsContainer'
import ModerationSettingsContainer from './containers/settings/ModerationSettingsContainer'
import MemberManagementContainer from './containers/members/MemberManagementContainer';

import GalleryShowContainer from './containers/gallery/GalleryShowContainer';
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
    gallery: document.getElementById('ca-app').getAttribute('data-customer-gallery'),
    galleryId: document.getElementById('ca-app').getAttribute('data-gallery-id')
  }

  updateAppData = this.updateAppData.bind(this);

  updateAppData(id, name, gallery, galleryId){
    this.setState({
      customerId: id,
      customerName: name,
      gallery: gallery,
      galleryId: galleryId
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
              <Route path='/gallery_artists/:id/edit' component={GalleryArtistEditContainer} />

              // Threads
              <Route path='/threads/:id' component={ArtsShowContainer} />
              <Route path='/threads' component={ArtsIndexContainer} />

              // Users
              <Route path='/users' component={CurrentUsersContainer} />

              // moderation
              <Route path='/moderation/moderators' component={ModeratorsContainer} />
              <Route path='/moderation/comments' component={ModerationCommentsContainer} />
              <Route path='/moderation' component={ModerationBaseContainer} />

              // Settings
              <Route path='/settings/site' component={SiteSettingsContainer} />
              <Route path='/settings/members' component={MemberManagementContainer} />
              <Route path='/settings/threads' component={ThreadsSettingsContainer} />
              <Route path='/settings/moderation' component={ModerationSettingsContainer} />
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
