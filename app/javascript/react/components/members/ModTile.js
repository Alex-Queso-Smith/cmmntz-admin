import React from 'react';

const ModTile = (props) => {
  return(
    <tr key={props.id}>
      <td>
        {props.name}
      </td>
      <td>
        {props.added_on}
      </td>
    </tr>
  )
}

export default ModTile;
