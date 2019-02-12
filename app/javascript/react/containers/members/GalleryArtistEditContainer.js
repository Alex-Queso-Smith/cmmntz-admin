import React from 'react';

import { FetchDidMount, FetchWithPush } from '../../util/CoreUtil';

class GalleryArtistEditContainer extends React.Component {
  state = {
    members: [],
    selectedMember: "",
    assignErrors: {}
  }

  handleAssign = this.handleAssign.bind(this);
  handleChange = this.handleChange.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/customers.json`)
    .then(customerData => {
      this.setState({
        members: customerData.customers
      })
    })
    .then(
      FetchDidMount(this, `/api/v1/gallery_artists/${this.props.match.params.id}.json`)
      .then(galleryArtist => {
        this.setState({ selectedMember: galleryArtist.customer_id  })
      })
    )
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }

  handleAssign(event){
    event.preventDefault();

    var newGalleryArtist = new FormData();

    newGalleryArtist.append( "gallery_artist[customer_id]", this.state.selectedMember )
    FetchWithPush(this, `/api/v1/gallery_artists/${this.props.match.params.id}.json`, '', 'PATCH', 'assignErrors', newGalleryArtist)
    .then(success => {
      if (!success.errors) {
        window.location = '/arts'
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { members } = this.state;

    var memberOptions;
    if (members) {
      memberOptions = members.map(member => {
        return(
          <option key={member.id} value={member.id} className="member-list-item">
            {`${member.name} - ${member.role}`}
          </option>
        )
      })
    }

    return(
      <div id="cf-member-edit-container" className="">
        <h4>Choose Member to Assign To Gallery Artist</h4>
          <select name="selectedMember" value={this.state.selectedMember} onChange={this.handleChange}>
            <option value="" />
            {memberOptions}
          </select>

          <button onClick={this.handleAssign} className="btn btn-sm black-button">Assign</button>
      </div>
    )
  }
}

export default GalleryArtistEditContainer
