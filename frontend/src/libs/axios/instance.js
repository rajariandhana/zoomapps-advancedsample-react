import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers,
});

export default instance;
