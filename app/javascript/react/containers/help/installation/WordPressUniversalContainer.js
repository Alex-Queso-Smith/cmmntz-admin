import React from 'react'

class WordPressUniversalContainer extends React.Component {
  state = {}

  render() {
    var gallery = document.getElementById('ca-app').getAttribute('data-customer-gallery')
    var galleryId = document.getElementById('ca-app').getAttribute('data-gallery-id')

    var galleryInstructionDisplay;
    if (!gallery) {
      galleryInstructionDisplay = "If you have not already, go to https://admin.classifilter.com/signup and sign up for a gallery account."
    } else {
      galleryInstructionDisplay = `You are logged in as '${gallery}'. Your gallery ID is '${galleryId}'.`
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

    return(
      <div className="cf-settings-base container">
        <h2 className="text-center">Classifilter Widget Universal Installation Instructions</h2>

        <br />
        <p className="text-center">Classifilter can be installed on most websites via the universal JavaScript installation code below.</p>
        <p className="text-center">Please note that these instructions do require some technical knowledge and are intended for use by developers.</p>
        <hr />

        <br />
        <h3>Getting Started</h3>
        <ul>
          <li>{galleryInstructionDisplay}</li>
          <li>You will need access to the HTML of the pages that you intend to add Classifilter to.</li>
        </ul>

        <br />
        <h3>Script Template</h3>
        <p style={indentStyle}>This is the base script that you will need. Once you have entered the required configuration variables listed below into the script, copy and paste it to the section of the page that you will want to have Classifilter display on.</p>

        <pre>
          &lt;script src="https://api.classifilter.com/javascripts/classifilter-embed.js"&gt;&lt;/script&gt;
          <br/>
          &lt;script type="text/javascript"&gt;
          <br/>
          Classifilter.init({`{`}<br/>
          {galleryIdDisplay},<br/>
          topics: 'Your topics here',<br/>
          publishDate: 'Your publish date here',<br/>
          artistName: 'Your author name',<br/>
          type: "Article or whatever type of page"<br/>
          {`}`});<br/>
          &lt;/script&gt;<br/>
          &lt;noscript&gt;<br/>
          Please enable JavaScript to see comments powered by Classifilter.<br/>
          &lt;/noscript&gt;
        </pre>

        <p style={indentStyle}>Alternatively, you can add the above script to the head section of your template and add a div with id: "classifilter-dropin" to your page where you want the widget to appear.</p>

        <br />
        <h3>Configuration Variables</h3>
        <p style={indentStyle}>The following configuration variables are required and must be passed into the script.</p>
        <ul>
          <li className="row">
            <strong className="col-2">galleryId: </strong>
            <div className="col-10">
              This is your id that was assigned to your organization on sign up and should be auto-populated in the script above. If it is not, please go to `https://admin.classifilter.com/signup` and signup.
            </div>
          </li>
          <br />
          <li className="row">
            <strong className="col-2">topics: </strong>
            <div className="col-10">
              A list of topics that relate to the content of your page. These should be passed in separated by commas.
            </div>
          </li>
          <br />
          <li className="row">
            <strong className="col-2">publishDate: </strong>
            <div className="col-10">
              The date of publication. This should be in the format of YYYY-MM-DD
            </div>
          </li>
          <br />
          <li className="row">
            <strong className="col-2">artistName: </strong>
            <div className="col-10">
              The name of the author of the article. Example: "Jane Smith"
            </div>
          </li>
          <br />
          <li className="row">
            <strong className="col-2">type: </strong>
            <div className="col-10">
              The type of content on the page. This can be any value you choose.
            </div>
          </li>
        </ul>

        <br />
        <h3>Optional Variables</h3>
        <p style={indentStyle}>These are variable that can be added to the configuration section of the script.</p>
        <ul>
          <li className="row">
            <strong className="col-2">urlOverride:</strong>
            <div className="col-10">
              The classifilter widget automatically creates a thread for the url of a page that it is added to. However it will also allow you to override the url of the page and use a different url instead. This will allow you to share the same thread on the same article on different versions of your site or if you have multiple url formats for your content.
            </div>
          </li>
        </ul>

      </div>
    )
  }
}
export default WordPressUniversalContainer;
