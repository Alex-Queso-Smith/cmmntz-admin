import React from 'react';

export const PaginationLineItem = (props) => {
  var nodeClass;
  if (props.r === props.page) {
    nodeClass = "current"
  }
  return(
    <li>
      <a className={nodeClass} href={"#"+props.r} onClick={() => props.getPage(props.r)}>{props.r}</a>
    </li>
  )
}

export const Paginator = (props) => {
  let p = 1;
  let rows = [];
  for(var x = 0; x < parseInt(props.totalRows); x += props.rowsPerPage){
    rows.push(p);
    p++;
  }

  var pages = rows.map((r) => {
    return(
      <PaginationLineItem
        key={r}
        r={r}
        page={props.page}
        getPage={props.getPage}
      />
    )}
  )
  return(
    <div className="pagination">
      <ul className="pagination">
        {pages}
      </ul>
    </div>
  )
}
