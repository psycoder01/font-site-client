import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = process.env.REACT_APP_API_URL || '';

export default axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `${getToken()}`,
  },
});
