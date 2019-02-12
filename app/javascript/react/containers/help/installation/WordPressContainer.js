import React from 'react'

class WordPressContainer extends React.Component {
  state = {}

  render() {
    var gallery = document.getElementById('ca-app').getAttribute('data-customer-gallery')
    var galleryId = document.getElementById('ca-app').getAttribute('data-gallery-id')

    var galleryInstructionDisplay;
    if (!gallery) {
      galleryInstructionDisplay = "If you have not already, go to https://admin.cmmntz.com/signup and sign up for a gallery account."
    } else {
      galleryInstructionDisplay = `You are logged in as '${gallery}'. Your gallery ID is '${galleryId}'.`
    }

    var galleryIdDisplay;
    if (galleryId) {
      galleryIdDisplay = `galleryId: '${galleryId}'`
    } else {
      galleryIdDisplay = "galleryId: 'your gallery ID'"
    }

    var cmmntzIdDisplay;
    if (galleryId) {
      cmmntzIdDisplay = `(${galleryId})`
    }

    var indentStyle = {
      marginLeft: "20px"
    }

    var boldStyle = {

    }

    return(
      <div className="cf-settings-base container cmmntz-container">
        <h2 className="text-center">CMMNTZ Widget WordPress Installation Instructions</h2>

        <hr />
        <p style={indentStyle}>{galleryInstructionDisplay}</p>

        <br />
        <h3 className="text-center">Getting Started</h3>

        <br />

        <ol>
          <li>In Wordpress admin, select Plugins > Add New</li>
          <li>Search For &quot;CMMNTZ&quot; and find the plugin by CMMNTZ</li>
          <li>Select Install Now > Activate Plugin</li>
          <li>In Wordpress admin, select CMMNTZ</li>
          <li>Enter in your CMMNTZ ID {cmmntzIdDisplay}</li>
          <li>Click Save</li>
        </ol>


        <br />

        <h3 className="text-center">After Installation</h3>
          <p style={indentStyle}>
            Adjust the settings for the widget via the navbar above to customize the experience for your users as well as set default settings for the widget on your site. Please visit the FAQ page for any additional help.
          </p>
      </div>
    )
  }
}
export default WordPressContainer;
