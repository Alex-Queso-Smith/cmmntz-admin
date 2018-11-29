import React from 'react';

export const ImageSelector = (type) => {

  if (type.includes('blank')) {
    return ''
  } else {
    return `/assets/${type}.png`
  }
}
