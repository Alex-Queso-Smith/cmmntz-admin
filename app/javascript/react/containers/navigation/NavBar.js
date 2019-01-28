import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  state = {}

  render(){

    var { customerId, customerName, gallery } = this.props;

    var titleStyle = {
      color: "#ffffff"
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
        <Link to={"/"} className="nav-link">Threads</Link>
        <Link to={"/"} className="nav-link">Users</Link>
        <Link to={"/"} className="nav-link">Moderation</Link>
        <Link to={"/"} className="nav-link">Settings</Link>
        <Link to={"/"} className="nav-link">Help</Link>
      </ul>

      galleryName = gallery
    }

    return(
      <div className="ca-navbar">
      <nav id="cf-navbar" className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <h2 style={titleStyle}>{galleryName}</h2>

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
