import React from 'react';

export const PaginationLineItem = (props) => {
  var nodeDisplay;
  if (props.r === '...') {
    nodeDisplay=
    <span>{props.r}</span>
  } else {
    var nodeClass;
    if (props.r === props.page) {
      nodeClass = "current"
    }

    nodeDisplay=
    <a className={nodeClass} href={"#"+props.r} onClick={() => props.getPage(props.r)}>{props.r}</a>
  }
  return(
    <li>
      {nodeDisplay}
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

  var range = GetRange(props.page, rows[rows.length - 1])
  var i = 0
  var pages = range.map((r) => {
    i++
    return(
      <PaginationLineItem
        key={`pagination_${i}`}
        r={r}
        page={props.page}
        getPage={props.getPage}
      />
    )
  })
  return(
    <div className="pagination">
      <ul className="pagination">
        {pages}
      </ul>
    </div>
  )
}

export const GetRange = (current, last) => {
  var delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || i >= left && i < right) {
          range.push(i);
      }
  }

  for (let i of range) {
      if (l) {
          if (i - l === 2) {
              rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
              rangeWithDots.push('...');
          }
      }
      rangeWithDots.push(i);
      l = i;
  }

  return rangeWithDots;
}
