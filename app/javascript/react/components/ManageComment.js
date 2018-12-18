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
      label="Add to Manage"
      checked={this.props.checked}
    />

    return(
      <div className="row cf-manage-comment margin-top-10px">
        <div className="cf-manage-comment-left col-sm-3 col-md-2">
          <h3>{userName}</h3>
          <BanUser banAction={this.props.handleBanUser} />
          <br />
          <h4>{datePosted}</h4>
          <br />
          {checkBox}
        </div>
        <div className="cf-manage-comment-right col-sm-9 col-md-10">
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
