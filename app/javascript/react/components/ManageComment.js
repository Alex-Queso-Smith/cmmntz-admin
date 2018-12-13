import React from 'react';

import BanUser from './modals/BanUser';

class ManageComment extends React.Component {
  render(){
    var { manage, text, userName, datePosted } = this.props;
    var manageButton, deleteButton;

    var buttonText = "Restore"
    if (manage === "pending") {
      buttonText = "Approve"
    }

    if (manage != "deleted") {
      deleteButton =
      <button className="btn btn-danger cf-manage-button" onClick={this.props.handleDeleteComment}>
        Delete
      </button>
    }

    if (manage != "") {
      manageButton =
      <button className="btn btn-primary cf-manage-button" onClick={this.props.handleManageComment}>
        {buttonText}
      </button>
    }

    return(
      <div className="row cf-manage-comment margin-top-10px">
        <div className="cf-manage-comment-left col-sm-3 col-md-2">
          <h3>{userName}</h3>
          <BanUser banAction={this.props.handleBanUser} />
          <br />
          <h4>{datePosted}</h4>
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
