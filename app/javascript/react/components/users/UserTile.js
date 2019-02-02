import React from 'react';

class UserTile extends React.Component {
  state = {
    showDemData: false
  }


  render(){
    var { id, user_name, gender, age_range, geo_coordinates } = this.props.user


    if (age_range != "") {
      if (age_range === "15-19") {
        age_range = "13-19"
      } else if (age_range === "75-79") {
        age_range = "75-plus"
      }
    }


    var demLink = <a href="" onClick={(e) => {e.preventDefault(); this.setState({ showDemData: true })}}>Show Dem</a>
    var demTile;
    if (this.state.showDemData) {
      demLink = <a href="" onClick={(e) => {e.preventDefault(); this.setState({ showDemData: false })}}>Hide Dem</a>
      demTile=
      <div className="user-id">
        Age Range: {age_range}
        <br/>
        Gender: {gender}
        <br/>
        Geo: {geo_coordinates}
      </div>
    }

    return(
      <div className="table-user-name">
        {user_name}
        <br/>
        {demLink}
        <br/>
        {demTile}
      </div>
    )
  }
}

export default UserTile;
