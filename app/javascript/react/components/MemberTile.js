import React from 'react';

const MemberTile = (props) => {
  return(
    <div className="cf-member-tile" key={props.id}>
      <div>
        {props.name}
      </div>
      <div>
        {props.role}
      </div>
      <div>
        {props.email}
      </div>
    </div>
  )
}

export default MemberTile;
