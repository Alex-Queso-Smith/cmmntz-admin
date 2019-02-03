import React from 'react'

class HelpBaseContainer extends React.Component {
  state = {
  }

  render() {
    var overideStyle = {
      color: "#000000"
    }
    var pointerReady = {
      cursor: "pointer"
    }
    return(
      <div className="cf-settings-base container">
        <h3 className="text-center">Choose Your Platform</h3>
        <div style={pointerReady} className="row justify-content-between">
          <div onClick={ () => { this.props.history.push('/help/embed/universal') } } className="col-3 cf-install-tile">
            <h3 style={overideStyle} className="text-center">Universal Install</h3>
          </div>
          <div onClick={ () => { this.props.history.push('/help/embed/wordpress') } } style={pointerReady} className="col-3 cf-install-tile">
            <h3 style={overideStyle} className="text-center">Word Press</h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
          <div className="col-3 cf-install-tile">
            <h3 className="text-center">
              Coming Soon
            </h3>
          </div>
        </div>
      </div>
    )
  }
}
export default HelpBaseContainer;
