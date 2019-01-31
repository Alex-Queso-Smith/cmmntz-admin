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

    var boldStyle = {

    }

    return(
      <div className="cf-settings-base container">
        <h2 className="text-center">Classifilter Widget WordPress Installation Instructions</h2>

        <br />
        <p className="text-center">Classifilter can be installed on most websites via the WordPress JavaScript installation code below.</p>
        <p className="text-center">Please note that these instructions do require some technical knowledge and are intended for use by developers.</p>
        <hr />

        <br />
        <h3>Getting Started</h3>
        <ul>
          <li>{galleryInstructionDisplay}</li>
          <br />
          <li>You will need access to the HTML of the pages that you intend to add Classifilter to. Please follow the instructions below to find the HTML and insert the appropriate code.</li>
        </ul>

        <br />
        <h3>Script</h3>

        <p style={indentStyle}>You will need to locate the comments.php file via the following steps.</p>
        <ol>
          <li>
            Access your Word Press File System.
          </li>
          <li>
            Navigate your your theme's comments.php. This could be:
            <ol>
              <li>
                wp-content
              </li>
              <li>
                themes
              </li>
              <li>
                your theme's name
              </li>
            </ol>
          </li>
          <li>
            Make a backup of your original comments.php.
          </li>
          <li>
            Open the comments.php file and replace it's entire contents with the script below.
          </li>
        </ol>

        <h5 className="text-center">DO NOT EDIT OR CHANGE THIS SCRIPT</h5>
        <pre>
        &lt;script src="https://api.classifilter.com/javascripts/classifilter-embed.js"&gt;&lt;/script&gt;
        <br/>
        &lt;script type="text/javascript"&gt;
        <br/>
        Classifilter.init({`{`}<br/>
          {galleryIdDisplay},<br/>
          topics: '&lt;?php foreach((get_the_category()) as $category) {`{`} echo $category->cat_name . ','; {`}`} ?&gt;',<br/>
          publishDate: '&lt;?php the_date('Y-m-d h:i:s'); ?&gt;',<br/>
          artistName: '&lt;?php the_author(); ?&gt;',<br/>
          type: "article"<br/>,
          urlOverride: '&lt;?php echo get_permalink($post); ?&gt;'<br/>,
          {`}`});<br/>
          &lt;/script&gt;<br/>
          &lt;noscript&gt;<br/>
          Please enable JavaScript to see comments powered by Classifilter.<br/>
          &lt;/noscript&gt;
          </pre>
        <br />

        <h3 className="text-center">After Installation</h3>
          <p style={indentStyle}>
            Adjust the settings for the widget via the navbar above to customize the experience for your users as well as set default settings for the widget on your site. Please visit the FAQ page for any additional help.
          </p>
      </div>
    )
  }
}
export default WordPressUniversalContainer;
