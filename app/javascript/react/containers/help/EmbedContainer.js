import React from 'react'

class EmbedContainer extends React.Component {
  state = {
  }

  render() {
    var gallery = document.getElementById('ca-app').getAttribute('data-customer-gallery')
    var galleryId = document.getElementById('ca-app').getAttribute('data-gallery-id')

    var galleryInstructionDisplay;
    if (gallery) {
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

    return(
      <div className="cf-settings-base container">
        <h3>Classifilter Widget Universal Installation Instructions</h3>

        <p>Classifilter can be installed on most websites via the universal JavaScript installation code below.</p>
        <p>Please note that these instructions do require some technical knowledge and are intended for use by developers.</p>

        <h5>Getting Started</h5>
        <ul>
          <li>{galleryInstructionDisplay}</li>
          <li>You will need access to the HTML of the pages that you intend to add Classifilter to.</li>
        </ul>


        <h5>Script Template</h5>
        <p>This is the base script that you will need. Copy and paste it to the section of the page that you will want to have Classifilter display on.</p>

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

        <p>Alternatively, you can add the above script to the head section of your template and add a div with id: "classifilter-dropin" to your page where you want the widget to appear.</p>

        <h5>Configuration Variables</h5>
        <p>The following configuration variables are required and must be passed into the Script</p>
        <ul>
          <li>
            <strong>galleryId:</strong>
            this is your id that was assigned to your organization on sign up
          </li>
          <li>
            <strong>topics:</strong>
            a list of topics that relate to the content of your page. These should be passed in separated by commas.
          </li>
          <li>
            <strong>publishDate</strong>
            the date of publication. This should be in the format of YYYY-MM-DD
          </li>
          <li>
            <strong>artistName:</strong>
            the name of the author of the article. Example: "Jane Smith"
          </li>
          <li>
            <strong>type:</strong>
            the type of content on the page. this can be any value you choose
          </li>
        </ul>

        <h5>Optional Variables</h5>
        <p>These are variable that can be added to the configuration section of the script.</p>
        <ul>
          <li>
            <strong>urlOverride:</strong>
            the classifilter widget automatically creates a thread for the url of a page that it is added to. However it will also allow you to override the url of the page and use a different url instead. This will allow you to share the same thread on the same article on different versions of your site or if you have multiple url formats for your content
          </li>
        </ul>

      </div>
    )
  }
}
export default EmbedContainer;
