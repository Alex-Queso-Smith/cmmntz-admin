import React from 'react'

import { SortDir, SortButton } from '../components/SortSelect'
import { ImageSelector } from '../util/VoteUtil';
import { SortButtons, FilterButtonsRowOne, FilterButtonsRowTwo, FilterCommentsBy, FilterVotesBy } from '../util/FilterUtil'

class CommentFiltersContainer extends React.Component {
  render(){

    var sortButtons = SortButtons(this)
    var filterButtonsRowOne = FilterButtonsRowOne(this)
    var filterButtonsRowTwo = FilterButtonsRowTwo(this)

    return(
      <div className="cf-filter-block">
        <div className="row vote-row" >
          <h4 className="col-2 col-sm-2 col-md-2">Sort</h4>

          {sortButtons}
          <SortDir
            value={this.props.sortOpts.sortDir}
            onClick={this.props.handleSortDirClick}
            image={ImageSelector(this.props.sortOpts.sortDir)}
          />
        </div>
        <br/>
        <h4>Filters</h4>
        <div className="row vote-row">
          {filterButtonsRowOne}
        </div>
        <div className="row vote-row">
          {filterButtonsRowTwo}
        </div>
        <br/>
        <div className="row">
          <h4>Show only comments from:</h4>
        </div>
        <div className="row">
          <FilterCommentsBy
            commentsFrom={this.props.sortOpts.commentsFrom}
            onClick={this.props.handleFilterByClick}
          />
        </div>
        <br />
        <div className="row">
          <h4>Show only Votes By:</h4>
        </div>
        <div className="row">
          <FilterVotesBy
            votesFrom={this.props.sortOpts.votesFrom}
            onClick={this.props.handleFilterByClick}
          />
        </div>

      </div>
    )
  }
};

export default CommentFiltersContainer
