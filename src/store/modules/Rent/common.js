import axios from 'axios'

export function fetchBounds () {
  return new Promise((resolve, reject) => {
    axios.get('/project-api/rent/infographic/bounds', {})
    .then(response => resolve(response.data))
    .catch(error => reject(error))
  })
}

export function fetchCount () {
  return new Promise((resolve, reject) => {
    axios.get('/project-api/rent/infographic/count', {})
    .then(response => resolve(response.data))
    .catch(error => reject(error))
  })
}

export function fetchInfographic (position, size = 'S') {
  return new Promise((resolve, reject) => {
    axios.get(`/project-api/rent/infographic/${position}`, { params: { size, }, })
    .then(response => resolve(response.data))
    .catch(error => reject(error))
  })
}

export function fetchInfographicCalc (params) {
  return new Promise((resolve, reject) => {
    axios.get(`/project-api/rent/infographic/calc`, { params, })
    .then(response => resolve(response.data))
    .catch(error => reject(error))
  })  
}