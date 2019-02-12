import React from 'react'

class HelpBaseContainer extends React.Component {
  state = {
  }

  render() {
    var overideStyle = {
      color: "#202430"
    }
    var pointerReady = {
      cursor: "pointer"
    }
    
    return(
      <div className="cf-settings-base container">
        <div style={pointerReady} className="row justify-content-between">
          <div onClick={ () => { this.props.history.push('/help/embed/universal') } } className="col-3 cf-install-tile">
            <h3 style={overideStyle} className="text-center">Universal Install</h3>
          </div>
          <div onClick={ () => { this.props.history.push('/help/embed/wordpress') } } style={pointerReady} className="col-3 cf-install-tile">
            <h3 style={overideStyle} className="text-center">Word Press</h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Blogger
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Tumblr
            </h3>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Squarespace
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Typepad
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Movable Type
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Drupal
            </h3>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Joomla
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Wix
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Weebly
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Strikingly
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Jekyll
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Ghost
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              HubSpot
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Shopify
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Adobe Muse
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Jimdo
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Postach.io
            </h3>
          </div>
          <div className="col-3 cf-install-tile coming-soon">
            <div className="overlay"><h3>Coming Soon</h3></div>
            <h3 className="text-center">
              Pattern
            </h3>
          </div>
        </div>
      </div>
    )
  }
}
export default HelpBaseContainer;
