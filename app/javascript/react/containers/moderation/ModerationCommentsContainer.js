import React from 'react'

import { CommentTabs }  from '../../components/Tabs';

class ModerationCommentsContainer extends React.Component {
  state = {
    comments: [],
    manageIds: [],
    display: "pending",
    allSelected: false
  }

  handleTabClick = this.handleTabClick.bind(this);

  handleTabClick(event){
    const target = event.target;
    const value = target.getAttribute('data-value');

    this.setState({
      display: value,
      manageIds: [],
      allSelected: false
     })
    this.loadComments(value)
  }

  render() {
    return(
      <div className="cf-manage-comments container">
        <CommentTabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />
        All comments will be here
      </div>
    )
  }
}
export default ModerationCommentsContainer;
