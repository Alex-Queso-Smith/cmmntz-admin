import React from 'react'

import { Checkbox } from '../../components/FormComponents';
import { SortDir, SortButton } from '../../components/SortSelect'
import { ImageSelector } from '../../util/VoteUtil';
import { SortButtons, FilterButtonsRowOne, FilterButtonsRowTwo, FilterCommentsBy, FilterVotesBy } from '../../util/FilterUtil'

class CommentFiltersContainer extends React.Component {
  state = {
    hideAnonAndGuest: this.props.sortOpts.hideAnonAndGuest
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.sortOpts.hideAnonAndGuest != this.state.hideAnonAndGuest) {
      this.setState({ hideAnonAndGuest: this.props.sortOpts.hideAnonAndGuest })
    }
  }

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
            image={ImageSelector(this.props.sortOpts.sortDir, this.props.globalSettings.baseImageUrl)}
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

        <div className="row checkbox-row">
          <Checkbox
            className="col-12"
            name={"hideAnonAndGuest"}
            checked={this.state.hideAnonAndGuest}
            label="Hide Anonymous and Guest Comments"
            onChange={this.props.onChange}
          />
        </div>

      </div>
    )
  }
};

export default CommentFiltersContainer
