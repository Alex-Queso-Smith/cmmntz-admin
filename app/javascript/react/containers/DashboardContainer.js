import React from 'react'
import { Link } from 'react-router-dom';

class DashboardContainer extends React.Component {

  render(){

    return(
      <div className="ca-dashboard-container container-fluid">
        <div className="row justify-content-center">

          <div className="col-4 ca-dashboard-tile ca-pending-comments-tile">
            <div className="row justify-content-center">
              <div className="ca-comments-count">
                57
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
                209
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="ca-comments-text">
                Total Comments
              </div>
            </div>
            <div className="row ca-button-row justify-content-between">
              <button className="ca-tile-button btn">Today</button>
              <button className="ca-tile-button btn">Week</button>
              <button className="ca-tile-button btn">Month</button>
              <button className="ca-tile-button btn">All</button>
            </div>
          </div>

          <div className="col-4 ca-dashboard-tile ca-votes-tile">
            <div className="row justify-content-center">
              <div className="ca-votes-count">
                4,000
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="ca-votes-text">
                Total Votes
              </div>
            </div>
            <div className="row ca-button-row justify-content-between">
              <button className="ca-tile-button btn">Today</button>
              <button className="ca-tile-button btn">Week</button>
              <button className="ca-tile-button btn">Month</button>
              <button className="ca-tile-button btn">All</button>
            </div>
          </div>

        </div>
        <div className="row justify-content-center">

          <div className="col-4 ca-dashboard-tile">
          </div>

          <div className="col-4 ca-dashboard-tile ca-installation-help-tile">

          </div>

          <div className="col-4 ca-dashboard-tile ca-users-tile">
            <div className="row justify-content-center">
              <div className="ca-users-count">
                57
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
