import React from 'react';
import Textarea from 'react-expanding-textarea';

import { FetchWithPush, FetchDidMount } from '../../util/CoreUtil';
import { Checkbox, Input } from '../../components/FormComponents';

class SiteSettingsContainer extends React.Component {
  state = {
    galleryId: "",
    name: "",
    siteUrl: "",
    commentEtiquette: ""
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/galleries/${document.getElementById('ca-app').getAttribute('data-gallery-id')}.json`)
    .then(galleryData => {

      var { id, name, site_url, comment_etiquette } = galleryData.gallery;

      this.setState({
        name: name,
        galleryId: id,
        siteUrl: site_url,
        commentEtiquette: comment_etiquette
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  handleChange(event){
    const target = event.target;
    const name = target.name;

    var value;
    if (target.type === "checkbox") {
      value = target.checked
    } else {
      if (target.getAttribute('data-value')) {
        value = target.getAttribute('data-value')
      } else {
        value = target.value
      }
    }
    this.setState({ [name]: value })
  };

  handleSubmit(event){
    event.preventDefault();

    const strip = (str) => {
      return str.replace(/^\s+|\s+$/g, '');
    }

    var { name, siteUrl, commentEtiquette } = this.state;

    var gallery = new FormData();
    gallery.append("gallery[comment_etiquette]", strip(commentEtiquette))
    gallery.append("gallery[name]", name)
    gallery.append("gallery[site_url]", siteUrl)

    FetchWithPush(this, `/api/v1/galleries/${document.getElementById('ca-app').getAttribute('data-gallery-id')}.json`, '/', 'PATCH', 'saveErrors', gallery)
    // .then(redirect => window.location = '/galleries')
    .then(redirect => { alert('Settings updated!') })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { name, siteUrl, commentEtiquette } = this.state;

    return(
      <div className="container cmmntz-container center-form">
        <Input
          name="name"
          label="Site Name"
          onChange={this.handleChange}
          content={name}
          type="input"
          addClass={""}
        />
        <Input
          name="siteUrl"
          label="Site URL"
          onChange={this.handleChange}
          content={siteUrl}
          type="input"
          addClass={""}
        />
        <div className="text-center text-medium margin-top-10px">Commenting Etiquette</div>
        <Textarea
          maxLength="8000"
          className="form-control margin-top-10px textarea"
          name="commentEtiquette"
          placeholder="Insert your custom commenting etiquette here or leave blank to use Classibridge default etiquette!"
          value={commentEtiquette}
          onChange={this.handleChange}
          rows={10}
        />
        <div className="margin-top-10px text-center">
          <button className="btn btn-med btn-dark" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}


export default SiteSettingsContainer;
