import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  state = {
    customerId: document.getElementById('ca-app').getAttribute('data-customer'),
    customerName: document.getElementById('ca-app').getAttribute('data-customer-name')
  }

  render(){

    var { customerId, customerName } = this.state;

    var titleStyle = {
      color: "#ffffff"
    }

    var buttonOne, buttonTwo;
    if (customerId == "") {
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
    }

    return(
      <div className="ca-navbar">
      <nav id="cf-navbar" className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <h2 style={titleStyle} >ClassiAdmin</h2>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

          </ul>
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
