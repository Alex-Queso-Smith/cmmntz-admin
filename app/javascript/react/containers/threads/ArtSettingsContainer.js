import React from 'react';
import Textarea from 'react-expanding-textarea';

import { FetchDidMount, FetchWithUpdate } from '../../util/CoreUtil';
import { Checkbox, Input } from '../../components/FormComponents';

class ArtSettingsContainer extends React.Component {
  state = {
    id: '',
    artType: '',
    topics: '',
    ignoreWarningChecker: false,
    disabled: false,
    deactivated: false,
    disabledMessage: ''
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleClose = this.handleClose.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/arts/${this.props.artId}.json?display=settings`)
    .then(artData => {
      var art = artData.art
      this.setState({
        id: art.id,
        artType: art.artType,
        topics: art.topics,
        ignoreWarningChecker: art.ignore_warning_checker,
        disabled: art.disabled,
        deactivated: art.deactivated,
        disabledMessage: art.disabled_message
      })
    })
  }

  handleChange(event) {
    var target = event.target
    var name = event.target.name
    var value;
    if (target.type === "checkbox") {
      value = target.checked
    } else {
      value = event.target.value
    }
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault;

    const strip = (str) => {
      return str.replace(/^\s+|\s+$/g, '');
    }

    var { id, artType, topics, ignoreWarningChecker, disabled, deactivated, disabledMessage } = this.state

    var art = new FormData();
    art.append("art[art_type]", artType)
    art.append("art[topics_list]", topics)
    art.append("art[ignore_warning_checker]", ignoreWarningChecker)
    art.append("art[disabled]", disabled)
    art.append("art[deactivated]", deactivated)
    art.append("art[disabled_message]", strip(disabledMessage))

    FetchWithUpdate(this, `/api/v1/arts/${this.props.artId}.json`, 'PATCH', art)
    .then(data => {
        if (data.errors) {
          alert("there are errors")
        } else {
          this.props.updateArt();
          this.handleClose();
        }
      }
    )
    .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  handleClose(){
    this.props.toggleSettings();
    this.props.scrollTop();
  }


  render(){
    var { artType, topics, ignoreWarningChecker, disabled, deactivated, disabledMessage } = this.state

    return(
      <div className="art-edit-settings-container">
        <Input
          name="artType"
          label="What Type Of Article is this?"
          onChange={this.handleChange}
          content={artType}
          type="input"
          addClass={"input-medium"}
        />
        <Input
          name="topics"
          label="List Topics for this Article:"
          onChange={this.handleChange}
          content={topics}
          type="input"
          addClass={"input-large"}
        />
        <Checkbox
          onChange={this.handleChange}
          name={"ignoreWarningChecker"}
          label={"Ignore automated checks?"}
          checked={ignoreWarningChecker}
        />
        <Checkbox
          onChange={this.handleChange}
          name={"disabled"}
          label={"Disable this article's commenting?"}
          checked={disabled}
        />
        <Checkbox
          onChange={this.handleChange}
          name={"deactivated"}
          label={"Deactivate this article's commenting?"}
          checked={deactivated}
        />
        <Textarea
          maxLength="8000"
          className="form-control margin-top-10px textarea"
          name="disabledMessage"
          placeholder="Leave a message a custom message for this article if it is disabled or deactivated."
          value={disabledMessage}
          onChange={this.handleChange}
          rows={3}
        />
        <div className="margin-top-10px">
          <button className="btn btn-med black-button float-left" onClick={this.handleClose}>
            Close
          </button>
          <button className="btn btn-med purple-button-width20 float-right" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
        <div className="clearfix" />
      </div>
    )
  }
}


export default ArtSettingsContainer;
