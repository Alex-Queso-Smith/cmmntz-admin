import React from 'react';

import ModTile from '../../components/members/ModTile';
import { FetchDidMount, FetchWithPush, FetchIndividual } from '../../util/CoreUtil';
import { Input } from '../../components/FormComponents';

class ModeratorsContainer extends React.Component {
  state = {
    moderators: [],
    displayModInput: false,
    newMod: "",
    newModErrors: {}
  }

  _isMounted = false

  handleModeratorLoad = this.handleModeratorLoad.bind(this);
  handleChange = this.handleChange.bind(this);
  handleAddMod = this.handleAddMod.bind(this);
  deleteMod = this.deleteMod.bind(this);

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
    event.preventDefault();

    var newMod = new FormData();

    newMod.append("user_name", this.state.newMod)

    FetchWithPush(this, `/api/v1/user_gallery_moderators.json`, '', 'POST', 'newModErrors', newMod)
    .then(body => {
      if (!body.errors) {
        this.handleModeratorLoad()
        this.setState({ newMod: "" })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteMod(userName){
    FetchIndividual(this, `/api/v1/remove_user_gallery_moderators.json?user_name=${userName}`, 'POST')
    .then(success => { this.handleModeratorLoad() })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
            addedOn={added_on}
            deleteMod={() => { this.deleteMod(mod.name) }}
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
        <button onClick={this.handleAddMod} className="btn btn-sm btn-dark ml-2">Add Moderator</button>
        <br />
        <button onClick={ () => { this.setState({ displayModInput: false, newMod: "" }) } } className="btn btn-sm btn-dark ml-2">Cancel</button>
      </div>
    } else {
      modInput =
      <button onClick={ () => { this.setState({ displayModInput: true, newMod: "" }) } } className="btn btn-sm btn-dark">Add Moderator</button>
    }

    return(
      <div className="container cmmntz-container center-form">
        <br />
        {modInput}
        <br/>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Added On</th>
              <th></th>
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
