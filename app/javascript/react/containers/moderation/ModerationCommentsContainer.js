import React from 'react'

import { FetchDidMount } from '../../util/CoreUtil';
import { Paginator } from '../../components/Paginator'

import { ModerationCommentTabs }  from '../../components/Tabs';

class ModerationCommentsContainer extends React.Component {
  state = {
    comments: [],
    manageIds: [],
    display: "",
    allSelected: false,
    page: 1,
    totalResults: 0,
    rowsPerPage: 0
  }

  handleTabClick = this.handleTabClick.bind(this);
  loadComments = this.loadComments.bind(this);

  componentDidMount(){
    this.loadComments(this.state.display)
  }

  loadComments(type){
    var url = `/api/v1/comments.json?page=${this.state.page}`;

    if (type != "") {
      url += `&display_mode=${type}`
    }

    FetchDidMount(this, url)
    .then(commentData => {
      this.setState({
        comments: commentData.comments,
        totalResults: commentData.totalResults,
        rowsPerPage: commentData.rowsPerPage,
        allSelected: false
      })
    })
  }

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

    var pagination =
      <Paginator
        totalRows={this.state.totalResults}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        getPage={this.getPage}
      />
    return(
      <div className="container cmmntz-container">
        <ModerationCommentTabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />
        All comments will be here

        {pagination}
      </div>
    )
  }
}
export default ModerationCommentsContainer;
