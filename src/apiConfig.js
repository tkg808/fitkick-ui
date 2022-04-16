// Determines dev API or prod API.
const API_URL = window.location.hostname === 'localhost' ?
  'http://localhost:8000/' :
  'https://fitkick-api.herokuapp.com/';

// const API_URL = 'https://fitkick-api.herokuapp.com/'
// const API_URL = 'http:localhost:8000/'

export default API_URL;