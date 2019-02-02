import React from 'react';

const LineItem = (props) => {
  var active;
  if (props.value === props.display) { active = "active" }

  return(
    <li className="nav-item">
      <a data-value={props.value} className={`nav-link ${active}`} onClick={props.onClick}>{props.title}</a>
    </li>
  )
}

export const CommentTabs  = (props) => {
  const types = [
    ["Pending Comments", "pending"],
    ["Flagged Comments", "flagged"],
    ["Deleted Comments", "deleted"],
    ["Thread Comments", ""]
  ]

  var links = types.map(type => {
    return(
      <LineItem
        key={type[1]}
        value={type[1]}
        title={type[0]}
        display={props.display}
        onClick={props.onClick}
      />
    )
  })

  return(
    <div className="cf-manage-comments-tabs">
      <ul className="nav nav-tabs">
        {links}
      </ul>
    </div>
  )
}

export const MemberTabs = (props) => {
  const types = [
    ["Members", ""],
    ["Create New Member", "new"]
  ]

  var links = types.map(type => {
    return(
      <LineItem
        key={type[1]}
        value={type[1]}
        title={type[0]}
        display={props.display}
        onClick={props.onClick}
      />
    )
  })

  return(
    <div className="cf-manage-members-tabs">
      <ul className="nav nav-tabs">
        {links}
      </ul>
    </div>
  )
}

export const ArtTabs = (props) => {
  const types = [
    ["Info", ""],
    ["Comments", "comments"]
  ]

  var links = types.map(type => {
    return(
      <LineItem
        key={type[1]}
        value={type[1]}
        title={type[0]}
        display={props.display}
        onClick={props.onClick}
      />
    )
  })

  return(
    <div className="cf-art-tabs">
      <ul className="nav nav-tabs">
        {links}
      </ul>
    </div>
  )
}

export const GalleryTabs = (props) => {
  const types = [
    ["Info", ""],
    ["Settings", "settings"]
  ]

  var links = types.map(type => {
    return(
      <LineItem
        key={type[1]}
        value={type[1]}
        title={type[0]}
        display={props.display}
        onClick={props.onClick}
      />
    )
  })

  return(
    <div className="cf-art-tabs">
      <ul className="nav nav-tabs">
        {links}
      </ul>
    </div>
  )
}

export const ModerationSettingsTabs = (props) => {
  const types = [
    ["Rules", "rules"],
    ["Users", "users"],
    ["Email Notifications", "emails"]
  ]

  var links = types.map(type => {
    return(
      <LineItem
        key={type[1]}
        value={type[1]}
        title={type[0]}
        display={props.display}
        onClick={props.onClick}
      />
    )
  })

  return(
    <div className="cf-art-tabs">
      <ul className="nav nav-tabs">
        {links}
      </ul>
    </div>
  )
}
