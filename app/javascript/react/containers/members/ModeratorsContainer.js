import React from 'react';

import ModTile from '../../components/members/ModTile';
import { FetchDidMount } from '../../util/CoreUtil';
import { Input } from '../../components/FormComponents';

class ModeratorsContainer extends React.Component {
  state = {
    moderators: [],
  }

  _isMounted = false

  componentDidMount(){
    this._isMounted = true;

    FetchDidMount(this, `/api/v1/user_gallery_moderators.json`)
    .then(response => {
      if (this._isMounted) {
        this.setState({
          moderators: response.moderators
        })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {

    var { moderators } = this.state;

    var allMods;
    if (moderators) {
      allMods = moderators.map(mod => {
        var { id, name, added_on } = mod;

        return(
          <ModTile
            key={id}
            name={name}
            added_on={added_on}
          />
        )
      })
    }
    return(
      <div>
      <br/>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Added On</th>
          </tr>
        </thead>
        <tbody>
          {allMods}
        </tbody>
      </table>
      </div>
    )
  }

}

export default ModeratorsContainer;
