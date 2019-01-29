import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  state = {}

  render(){

    var { customerId, customerName, gallery } = this.props;

    var titleStyle = {
      color: "#ffffff",
      margin: "0px"
    }

    var firstLinkStyle = {
      marginLeft: "10px"
    }

    var galleryName = "ClassiAdmin";

    var buttonOne, buttonTwo, links;
    if (!customerId) {
      buttonOne =
        <Link className="nav-link ml-auto" to={`/customer_sessions`}>Login</Link>
      buttonTwo =
        <Link className="nav-link ml-auto" to={`/signup`}>Sign Up</Link>
    } else {
      buttonOne =
      <li className="nav-item dropdown mr-auto">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {customerName}
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <Link to={`/members/${customerId}/edit`} className="dropdown-item" >Edit Account</Link>
          <div className="dropdown-divider"/>
          <a className="dropdown-item" href={`/logout`} >Logout</a>
        </div>
      </li>

      links =
      <ul className="navbar-nav mr-auto">
        <Link style={firstLinkStyle} to={"/"} className="nav-link">Dashboard</Link>
        <Link to={"/threads"} className="nav-link">Threads</Link>
        <Link to={"/users"} className="nav-link">Users</Link>
        <li className="nav-item dropdown mr-auto">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Moderation
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <Link to="/moderation" className="dropdown-item" >Moderation</Link>
            <div className="dropdown-divider"/>
            <Link to="/moderation/comments" className="dropdown-item" >Comments</Link>
            <Link to="/moderation/moderators" className="dropdown-item" >Moderators</Link>
          </div>
        </li>
        <li className="nav-item dropdown mr-auto">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Settings
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <Link to="/settings" className="dropdown-item" >Settings</Link>
            <div className="dropdown-divider"/>
            <Link to="/settings/site" className="dropdown-item" >Site</Link>
            <Link to="/settings/moderation" className="dropdown-item" >Moderation</Link>
            <Link to="/settings/threads" className="dropdown-item" >Threads</Link>
            <Link to="/settings/members" className="dropdown-item" >Members</Link>
          </div>
        </li>
        <li className="nav-item dropdown mr-auto">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Help
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <Link to="/help" className="dropdown-item" >Help</Link>
            <div className="dropdown-divider"/>
            <Link to="/help/embed" className="dropdown-item" >Embed</Link>
            <Link to="/help/moderation" className="dropdown-item" >Moderation</Link>
            <Link to="/help/faq" className="dropdown-item" >FAQ</Link>
          </div>
        </li>
      </ul>

      galleryName = gallery
    }

    return(
      <div className="ca-navbar">
      <nav id="cf-navbar" className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <h3 style={titleStyle}>{galleryName}</h3>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {links}
          <ul className="navbar-nav ml-auto">
            {buttonOne}
            {buttonTwo}
          </ul>

        </div>
      </nav>
        {this.props.children}
      </div>
    )
  }
}

export default NavBar;
