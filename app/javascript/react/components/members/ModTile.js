import React from 'react';

const ModTile = (props) => {
  return(
    <tr key={props.id}>
      <td>
        {props.name}
      </td>
      <td>
        {props.addedOn}
      </td>
      <td>
        <button className="btn ca-tile-button btn-sm" onClick={props.deleteMod}>
          Remove
        </button>
      </td>
    </tr>
  )
}

export default ModTile;
