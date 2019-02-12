import React from 'react'
import { Link } from 'react-router-dom';

import { FetchDidMount } from '../util/CoreUtil';

class DashboardContainer extends React.Component {
  state = {
    pendingComments: 0,
    commentsDisplay: 'today',
    commentsData: {
      all: 0,
      month: 0,
      week: 0,
      today: 0
    },
    votesDisplay: 'today',
    votesData: {
      all: 0,
      month: 0,
      week: 0,
      today: 0
    },
    usersDisplay: 'all',
    usersData: {
      all: 0,
      month: 0,
      week: 0,
      today: 0
    },
    topThread: {
      url: "",
      commentsCount: 0,
      votesCount: 0
    }
  }

  handleButtonClick = this.handleButtonClick.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/dashboards.json`)
    .then(dashData => {
      var { pending_comments, comments_by_timeframes, votes_by_timeframes, users_by_timeframes, top_thread } = dashData.dashboard
      this.setState({
        pendingComments: pending_comments,
        commentsData: comments_by_timeframes,
        votesData: votes_by_timeframes,
        usersData: users_by_timeframes,
        topThread: top_thread
      })
    })
  }

  handleButtonClick(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({ [name]: value })
  }

  render(){
    var { pendingComments, commentsDisplay, commentsData, votesDisplay, votesData, usersDisplay, usersData, topThread } = this.state

    var commentsValueDisplay = commentsData[commentsDisplay]
    var votesValueDisplay = votesData[votesDisplay]
    var usersValueDisplay = usersData[usersDisplay]

    var buttonValues = ["Today", "Week", "Month", "All"]

    var commentButtons =
    buttonValues.map((button) => {
      var buttonClass = "ca-tile-button"
      if (commentsDisplay == button.toLowerCase()) {
        buttonClass = "ca-tile-button-selected"
      }

      return(
        <button key={`comments_${button.toLowerCase()}`} onClick={this.handleButtonClick} name="commentsDisplay" value={button.toLowerCase()} className={`${buttonClass} btn`}>{button}</button>
      )
    })

    var voteButtons =
    buttonValues.map((button) => {
      var buttonClass = "ca-tile-button"
      if (votesDisplay == button.toLowerCase()) {
        buttonClass = "ca-tile-button-selected"
      }

      return(
        <button key={`votes_${button.toLowerCase()}`} onClick={this.handleButtonClick} name="votesDisplay" value={button.toLowerCase()} className={`${buttonClass} btn`}>{button}</button>
      )
    })

    var userButtons =
    buttonValues.map((button) => {
      var buttonClass = "ca-tile-button"
      if (usersDisplay == button.toLowerCase()) {
        buttonClass = "ca-tile-button-selected"
      }

      return(
        <button key={`users_${button.toLowerCase()}`} onClick={this.handleButtonClick} name="usersDisplay" value={button.toLowerCase()} className={`${buttonClass} btn`}>{button}</button>
      )
    })

    var topThreadContent =
    <div className="justify-content-center">
      <div className="row ca-thread-title">
        Top Thread
      </div>
      <div className="row text-center">
        There has been no activity on threads created in the past 7 days.
      </div>
    </div>

    if (topThread.id != '') {
      topThreadContent =
      <div className="justify-content-center">
        <div className="row ca-thread-title justify-content-center">
          <Link to={`/threads/${topThread.id}`}>Top Thread</Link>
        </div>
        <div className="d-flex justify-content-around ca-thread-content">
          <div className="">
            <span className="ca-thread-count-title">Comments:  </span><span className="ca-thread-count">{topThread.commentsCount}</span>
          </div>
          <div className="">
            <span className="ca-thread-count-title">Votes: </span><span className="ca-thread-count">{topThread.votesCount}</span>
          </div>
        </div>
      </div>
    }

    return(
      <div className="ca-dashboard-container container-fluid">
        <div className="row justify-content-center">

          <div className="col-4 ca-dashboard-tile ca-pending-comments-tile">
            <div className="row justify-content-center">
              <div className="ca-comments-count">
                {pendingComments}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="ca-comments-text">
                Pending Comments
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="ca-comments-text-parens">
                (all threads)
              </div>
            </div>
            <div className="row justify-content-center">
              <Link to={`/moderation/comments`}>
                <button className="ca-tile-button btn">
                  Manage Comments
                </button>
              </Link>
            </div>
          </div>

          <div className="col-4 ca-dashboard-tile ca-comments-tile">
            <div className="row justify-content-center">
              <div className="ca-comments-count">
                {commentsValueDisplay}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="ca-comments-text">
                Total Comments
              </div>
            </div>
            <div className="row ca-button-row justify-content-between">
              {commentButtons}
            </div>
          </div>

          <div className="col-4 ca-dashboard-tile ca-votes-tile">
            <div className="row justify-content-center">
              <div className="ca-votes-count">
                {votesValueDisplay}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="ca-votes-text">
                Total Votes
              </div>
            </div>
            <div className="row ca-button-row justify-content-between">
              {voteButtons}
            </div>
          </div>

        </div>
        <div className="row justify-content-center">

          <div className="col-4 ca-dashboard-tile ca-thread-tile">
            {topThreadContent}
          </div>

          <div className="col-4 ca-dashboard-tile ca-installation-help-tile">
            <div className="row justify-content-center ca-installation-button">
              <Link to={`/help/embed`}>
                <button className="ca-tile-button btn">
                  Installation
                </button>
              </Link>
            </div>
            <div className="row justify-content-center">
              <Link to={`/help/embed`}>
                <button className="ca-tile-button btn">
                  Help / FAQ
                </button>
              </Link>
            </div>
          </div>

          <div className="col-4 ca-dashboard-tile ca-users-tile">
            <div className="row justify-content-center">
              <div className="ca-users-count">
                {usersValueDisplay}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="ca-users-text">
                Total Users
              </div>
            </div>
            <div className="row justify-content-center">
              <Link to={`/users`}>
                <button className="ca-tile-button btn">
                  Manage Users
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    )
  }
}


export default DashboardContainer;
