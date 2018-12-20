import React from 'react';

export const FetchWithPush = (object, path, push, method, errors, payload) => {
  return fetch(path, {
    method: method,
    credentials: 'same-origin',
    body: payload
  })
  .then(response => {
     if(response.ok || response.status == 422){
       return response
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage)
       throw(error)
     }
   })
   .then(response => response.json())
   .then(body => {
     if (body.errors) {
       object.setState({ [errors]: body.errors})
     } else {
       if (push != '') {
         object.props.history.push(push)
       } else {
         return body 
       }
     }
   })
}

export const FetchDidMount = (object, path) => {
  return fetch(path, { credentials: 'same-origin' })
  .then(response => {
     if(response.ok){
       return response
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage)
       throw(error)
     }
   })
   .then(response => response.json())
}

export const FetchWithUpdate = (object, path, method, payload) => {
  return fetch(path, {
    method: method,
    credentials: 'same-origin',
    body: payload
  })
  .then(response => {
     if(response.ok || response.status == 422){
       return response
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage)
       throw(error)
     }
   })
   .then(response => response.json())
}

export const FetchIndividual = (object, path, method) => {
  return fetch(path, {
    method: method,
    credentials: 'same-origin'
  })
  .then(response => {
     if(response.ok){
       return response
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage)
       throw(error)
     }
   })
   .then(response => response.json())
}
