// Determines which API to use.
const API_URL = window.location.hostname === 'localhost' ?
  'http://localhost:8000/' :
  'https://fitkick-api.herokuapp.com/';

export default API_URL;