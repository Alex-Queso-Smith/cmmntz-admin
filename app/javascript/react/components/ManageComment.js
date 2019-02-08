import React from 'react';

import BanUser from './modals/BanUser';
import { Checkbox } from './FormComponents';
import VotingContainerBase from './voting/VotingContainerBase';
import UserAvatar from './users/UserAvatar';

class ManageComment extends React.Component {
  state = {
    showFullText: false
  }

  handleStateFlip = this.handleStateFlip.bind(this);

  handleStateFlip(event){
    event.preventDefault();

    const target = event.target;
    const name = target.name;
    const state = this.state[name];

    this.setState({ [name]: !state })
  }

  render(){
    var { manage, text, userName, datePosted, globalSettings } = this.props;
    var manageButton, deleteButton;

    var buttonText = "Restore";

    if (manage === "pending") {
      buttonText = "Approve"
    } else if (manage === "flagged") {
      buttonText = "Ignore"
    }

    var buttonMargin = {
      margin: "5px"
    }

    if (manage != "deleted") {
      deleteButton =
      <button className="btn btn-md black-button cf-manage-button margin-all-5px width-90" onClick={this.props.handleDeleteComment}>
        Delete
      </button>
    }

    var width28 = {
      width: "28%"
    }

    if (manage != "") {
      manageButton =
      <button style={width28} className="btn btn-md ca-tile-button cf-manage-button margin-all-5px width-90" onClick={this.props.handleManageComment}>
        {buttonText}
      </button>
    }

    var userActions;
    if (!this.props.userIsAdmin && !this.props.userIsMod) {
      userActions =
      <BanUser banAction={this.props.handleBanUser} />
    } else {
      if (this.props.userIsAdmin) {
        userActions = "Admin"
      } else {
        userActions = "Mod"
      }
    }

    var datePosted = this.props.datePosted;

    var textBox;

    var textLength = 400 ;
      if (text.length > textLength) {
        if (!this.state.showFullText) {
          textBox =
          <div className="cf-comment-text" >
            <div className="cf-display-linebreak" dangerouslySetInnerHTML={{__html: text.substring(0, textLength) + "..."}} />
            <br />
            <a href='#' onClick={this.handleStateFlip} name="showFullText" className="cf-link-text">show more</a>
          </div>
        } else {
          textBox =
          <div className="cf-comment-text" >
            <div className="cf-display-linebreak" dangerouslySetInnerHTML={{__html: text}} />
            <br />
            <a href='#' onClick={this.handleStateFlip} name="showFullText" className="cf-link-text">show less</a>
          </div>
        }
      } else {
        textBox =
        <div className="cf-comment-text" >
          <div className="cf-display-linebreak" dangerouslySetInnerHTML={{__html: text}} />
        </div>
      }

    var inlineStyle = {
      display: ""
    }

    var showVotes = false;
    var voteCount;

    if (this.props.manage != "pending") {
      showVotes = true;
      voteCount = `${this.props.totalInteractions} votes`
    }

    return(
      <div className="row cf-manage-comment margin-top-10px">
        <div className="cf-manage-comment-checkbox col-1">
          <Checkbox
            checked={this.props.checked}
            onChange={this.props.handleCheck}
            name={this.props.id}
            className="input"
          />
        </div>
        <div className="cf-comment-wrapper col-7">
          <UserAvatar
            globalSettings={globalSettings}
            baseImage={this.props.baseImage}
            userName={this.props.userName}
          />
          <div className="cf-comment-w-meta">
            <div className="cf-comment-comment-meta row">
              <div className="cf-comment-user-name col">
                {this.props.userName}
              </div>
            </div>

            <div className="row">
              <div className="col float-right">
                {datePosted}
              </div>
            </div>

            {textBox}
            <div className="cf-cf-fade-button-group">
              {voteCount}
            </div>

          </div>
        <VotingContainerBase
          commentId={this.props.id}
          commentVotes={this.props.votes}
          totalInteractions={this.props.totalInteractions}
          votePercents={this.props.votePercents}
          showVotes={showVotes}
          voteCounts={this.props.votes}
          globalSettings={globalSettings}
        />
      </div>
      <div style={inlineStyle} className="col-4">
        <div className="d-flex flex-column justify-content-around">
          <div className="column">
            {userActions}
          </div>
          <div className="column">
            {deleteButton}
          </div>
          <div className="column">
            {manageButton}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default ManageComment;
