import React from 'react';

class UserAvatar extends React.Component {
  state = {}


  render(){
    var { baseImage, userName } = this.props;

    var avatarImage;

    if (userName === 'Anonymous') {
      avatarImage = `${this.props.globalSettings.baseImageUrl}/images/avatars/anonymous-avatar.png`;
    } else if (baseImage != "") {
      avatarImage = `${this.props.globalSettings.baseImageUrl}/images/avatars/${baseImage}.png`
    }

    return(
      <div className="user-avatar-container">
        <div className="cf-comment-user-meta">
          <div className="cf-comment-user-avatar">
            <span className="cf-avatar-helper"></span>
            <img className={`cf-avatar-image`} src={avatarImage} />
          </div>
        </div>
      </div>
    )
  }
}

export default UserAvatar;
