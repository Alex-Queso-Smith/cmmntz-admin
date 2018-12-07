import React from 'react';

export const ImageSelector = (type) => {

  if (type.includes('blank')) {
    return ''
  } else {
    return `/assets/${type}.png`
  }
}

export const ImageSelectorTemp = (filterList, notFilterList, type) => {
  if (filterList.includes(`${type}_percent`)) {
    return `/assets/${type}-selected`
  } else if (notFilterList.includes(`${type}_percent`)) {
    return  `/assets/${type}-unselected`
  } else {
    return `/assets/${type}`
  }
}
