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
      <td>
        {props.editButton}
      </td>
    </tr>
  )
}

export default MemberTile;
