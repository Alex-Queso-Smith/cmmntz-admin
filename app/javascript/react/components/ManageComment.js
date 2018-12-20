import React from 'react';

import BanUser from './modals/BanUser';
import {Checkbox} from './FormComponents';

class ManageComment extends React.Component {
  render(){
    var { manage, text, userName, datePosted } = this.props;
    var manageButton, deleteButton;

    var buttonText = "Restore"
    if (manage === "pending") {
      buttonText = "Approve"
    } else if (manage === "flagged") {
      buttonText = "Ignore"
    }

    if (manage != "deleted") {
      deleteButton =
      <button className="btn btn-danger cf-manage-button" onClick={this.props.handleDeleteComment}>
        Delete
      </button>
    }

    if (manage != "") {
      manageButton =
      <button className="btn btn-dark cf-manage-button" onClick={this.props.handleManageComment}>
        {buttonText}
      </button>
    }

    var checkBox =
    <Checkbox
      name={this.props.id}
      onChange={this.props.handleCheck}
      checked={this.props.checked}
    />

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
    return(
      <div className="row cf-manage-comment margin-top-10px">
        <div className="cf-manage-comment-left col-1 col-sm-1 col-md-1">
          {checkBox}
        </div>
        <div className="cf-manage-comment-left col-5 col-sm-5 col-md-2">
          <h3>{userName}</h3>
          {userActions}
          <br />
          <h4>{datePosted}</h4>
          <br />
        </div>
        <div className="cf-manage-comment-right col-6 col-sm-6 col-md-9">
          <div className="cf-manage-comment-text">
            {text}
          </div>
          <div className="cf-manage-comment-actions">
            {deleteButton}
            {manageButton}
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

export default ManageComment;
