import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import GallerySettingsContainer from './containers/GallerySettingsContainer';

class App extends React.Component {
  render(){
    return(
      <Router>
        <div>
          <Route path='/galleries/:id/edit' component={GallerySettingsContainer}/>
        </div>
      </Router>
    )
  }
}

export default App
