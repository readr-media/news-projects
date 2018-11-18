import axios from 'axios'

export function fetchAppDetail ({ targ_ref, }) {
  return new Promise((resolve, reject) => {
    axios.get(`/proj-assets/referendum/json/referendum-${targ_ref}.json`, {})
    .then(response => resolve(response.data))
    .catch(error => reject(error))
  })
}
