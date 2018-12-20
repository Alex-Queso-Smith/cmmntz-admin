import React from 'react';

const MemberTile = (props) => {
  return(
    <tr key={props.id}>
      <td>
        {props.name}
      </td>
      <td>
        {props.email}
      </td>
      <td>
        {props.role}
      </td>
    </tr>
  )
}

export default MemberTile;
