import React from 'react'

class EmbedUniversalContainer extends React.Component {
  state = {}

  render() {
    var gallery = document.getElementById('ca-app').getAttribute('data-customer-gallery')
    var galleryId = document.getElementById('ca-app').getAttribute('data-gallery-id')

    var galleryInstructionDisplay;
    if (!gallery) {
      galleryInstructionDisplay = "If you have not already, go to https://admin.cmmntz.com/signup and sign up for a gallery account."
    } else {
      galleryInstructionDisplay = `You are logged in as '${gallery}'. Your CMMNTZ ID is '${galleryId}'.`
    }

    var galleryIdDisplay;
    if (galleryId) {
      galleryIdDisplay = `galleryId: '${galleryId}'`
    } else {
      galleryIdDisplay = "galleryId: 'your gallery ID'"
    }

    var indentStyle = {
      marginLeft: "20px"
    }

    var preStyle = {
      width: "55%",
      margin: "auto"
    }

    var boldStyle = {
      fontWeight: "bold"
    }

    var width75 = {
      width: "75%"
    }

    return(
      <div className="cf-settings-base container cmmntz-container">
        <h2 className="text-center">CMMNTZ Widget Universal Installation Instructions</h2>

        <br />
        <p className="text-center">CMMNTZ can be installed on most websites via the universal JavaScript installation code below.</p>
        <p className="text-center">Please note that these instructions do require some technical knowledge and are intended for use by developers.</p>
        <hr />

        <br />
        <h3>Getting Started</h3>
        <ul>
          <li>{galleryInstructionDisplay}</li>
          <br />
          <li>You will need access to the HTML of the pages that you intend to add CMMNTZ to.</li>
        </ul>

        <br />
        <h3>Script Template</h3>
        <p style={indentStyle}>This is the base script that you will need.</p>
        <p style={indentStyle}>
           If you are using a CMS system such you must replace the Configuration Variable inputs with the appropriate variables for that CMS system.
        </p>
        <p style={indentStyle}>
          Once you have entered the required configuration variables listed below into the script, copy and paste it to the section of the page that you will want to have CMMNTZ display on.
        </p>
        <p style={indentStyle}>
          Please review the finished examples below the script template for reference.
        </p>
        <br />
        <h5 className="text-center">Script Template</h5>
        <pre style={preStyle}>
          &lt;script src="https://api.cmmntz.com/javascripts/cmmntz-embed.js"&gt;&lt;/script&gt;
          <br/>
          &lt;script type="text/javascript"&gt;
          <br/>
          Cmmntz.init({`{`}<br/>
          {galleryIdDisplay},<br/>
          topics: 'Your topics here',<br/>
          publishDate: 'Your publish date here',<br/>
          artistName: 'Your author name',<br/>
          type: 'Article or whatever type of page',<br/>
        urlOverride: 'Your Article URL'<br/>
          {`}`});<br/>
          &lt;/script&gt;<br/>
          &lt;noscript&gt;<br/>
        Please enable JavaScript to see comments powered by CMMNTZ.<br/>
          &lt;/noscript&gt;
        </pre>
        <br />
        <p style={indentStyle}>Alternatively, you can add the above script to the head section of your template and add a div with id: "cmmntz-dropin" to your page where you want the widget to appear.</p>

        <br />
        <h5 className="text-center">Ruby Template Example</h5>
          <div className="row justify-content-center">
            <div className="example-image">
              <img src="/images/universal_example_ruby.png" className="img-fluid"/>
            </div>
          </div>

        <br />
        <h5 className="text-center">PHP Template Example</h5>
        <div className="row justify-content-center">
          <div className="example-image">
            <img src="/images/universal_example_php.png" className="img-fluid"/>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th style={width75}>Description</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>
                galleryId
              </td>
              <td>
                This is your id that was assigned to your organization on sign up and should be auto-populated in the script above. If it is not, please go to
                <a href={`https://www.cmmntz.com`}> CMMNTZ Signup </a>
                 and signup.
              </td>
            </tr>

            <tr>
              <td>
                topics
              </td>
              <td>
                A list of topics that relate to the content of your page. These should be passed in separated by commas.
              </td>
            </tr>

            <tr>
              <td>
                publishDate
              </td>
              <td>
                The date of publication. This should be in the format of YYYY-MM-DD.
              </td>
            </tr>

            <tr>
              <td>
                artistName
              </td>
              <td>
                The name of the author of the article.
              </td>
            </tr>

            <tr>
              <td>
                type
              </td>
              <td>
                The type of content on the page.
              </td>
            </tr>

            <tr>
              <td>
                urlOverride
              </td>
              <td>
                The CMMNtZ widget automatically creates a thread for the url of a page that it is added to. However it will also allow you to override the url of the page and use a different url instead. This will allow you to share the same thread on the same article on different versions of your site or if you have multiple url formats for your content.              </td>
            </tr>

          </tbody>
        </table>
        <br />

        <h3 className="text-center">After Installation</h3>
          <p style={indentStyle}>
            Adjust the settings for the widget via the navbar above to customize the experience for your users as well as set default settings for the widget on your site. Please visit the FAQ page for any additional help.
          </p>
      </div>
    )
  }
}
export default EmbedUniversalContainer;
