import React from 'react';
import BasicModal from './BasicModal';

export const BanUser = props => {
  var style = {
    marginLeft: "10px"
  }

  return (
    <BasicModal
      modalButtonText="Ban"
      modalTitle={"Ban this User?"}
      modalButtonClass={"btn-danger"}
    >
    Ban This User &nbsp;&nbsp;&nbsp;
    <select style={style}>
      <option value="">Forever</option>
      <option value="day">For 1 day</option>
      <option value="week">For 1 Week</option>
      <option value="month">For 1 Month</option>
      <option value="year">For 1 Year</option>
    </select>

    <button style={style} className="btn btn-sm btn-danger margin-all-5px" onClick={props.banAction}>
      Ban User
    </button>
    </BasicModal>
  )

}

export default BanUser
