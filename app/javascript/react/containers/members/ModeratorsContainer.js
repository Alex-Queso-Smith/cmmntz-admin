import React from 'react';

import ModTile from '../../components/members/ModTile';
import { FetchDidMount } from '../../util/CoreUtil';
import { Input } from '../../components/FormComponents';

class ModeratorsContainer extends React.Component {
  state = {
    moderators: [],
    displayModInput: false,
    newMod: ""
  }

  _isMounted = false

  handleModeratorLoad = this.handleModeratorLoad.bind(this);
  handleChange = this.handleChange.bind(this);
  handleAddMod = this.handleAddMod.bind(this);

  componentDidMount(){
    this._isMounted = true;
    this.handleModeratorLoad()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleChange(event){
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value })
  }

  handleModeratorLoad() {
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

  handleAddMod(event){

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

    var modInput;
    if (this.state.displayModInput) {
      modInput =
      <div className="form-inline">
        <Input
          name="newMod"
          placeholder="User Name"
          addClass=''
          type="text"
          content={this.state.newMod}
          onChange={this.handleChange}
          />
        <button className="btn btn-sm btn-dark">Add Moderator</button>
        <br />
        <button onClick={ () => { this.setState({ displayModInput: false }) } } className="btn btn-sm btn-dark">Cancel</button>
      </div>
    } else {
      modInput =
      <button onClick={ () => { this.setState({ displayModInput: true }) } } className="btn btn-sm btn-dark">Add Moderator</button>
    }

    return(
      <div>
        <br />
        {modInput}
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
