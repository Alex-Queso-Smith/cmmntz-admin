import React from 'react';

export const Checkbox = props => {
  return(
    <div className={`custom-control custom-checkbox margin-top-10px ${props.className}`}>
      <input
      type="checkbox"
      className="custom-control-input cf-checkbox"
      name={props.name}
      id={props.name}
      onClick={props.onChange}
      autoComplete="off"
      checked={props.checked}
      onChange={() => {}}
      />
      <label className="custom-control-label" htmlFor={props.name}>{props.label}</label>
    </div>
  );
};

export const Input = props => {
  return(
    <div className="form-group">
      <label className="text-medium" htmlFor={props.name}>{props.label}</label>
      <input className={`form-control margin-top-10px ${props.addClass}`} type={props.type} name={props.name} value={props.content} onChange={props.onChange}></input>
    </div>
  );
};

export const RadioButton = props => {
  return(
    <label htmlFor={props.id} className="">
      <input onChange={props.onChange} type="radio" name={props.name} id={props.id} autoComplete="off" value={props.value} /> {props.label}
    </label>
  );
};
