import React from 'react';
import { RowOneVoteButtons, RowTwoVoteButtons } from '../../util/VoteUtil';

class VotingContainerBase extends React.Component {
  state = {
    selectedVotes: [],
    votePercents: this.props.votePercents,
    voteCounts: this.props.voteCounts,
    totalInteractions : this.props.totalInteractions
  }

  render(){
    var { showVotes, commentId } = this.props;

    var voteRowOne = RowOneVoteButtons(this);
    var voteRowTwo;

    if (showVotes) {
      voteRowTwo = RowTwoVoteButtons(this);
    }

    return(
      <div className="cf-votes-container">
        <div className="cf-votes-top-row row justify-content-center">
          {voteRowOne}
        </div>
        <div className="cf-votes-bot-row row justify-content-center">
          {voteRowTwo}
        </div>
      </div>

    )
  }
}

export default VotingContainerBase;
