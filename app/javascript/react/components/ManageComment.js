import React from 'react';

class ManageComment extends React.Component {
  render(){
    return(
      <div className="row cf-manage-comment margin-top-10px">
        <div className="cf-manage-comment-left col-sm-2">
          <h3>{this.props.userName}</h3>
          <br />
          <h4>{this.props.datePosted}</h4>
        </div>
        <div className="cf-manage-comment-right col-sm-10">
          <div className="cf-manage-comment-text">
            {this.props.text}
          </div>
          <div className="cf-manage-comment-actions">
            <button className="btn btn-danger" onClick={this.props.onClick}>
              Delete
            </button>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

export default ManageComment;
