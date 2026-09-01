import axios from 'axios';

// NOTE:  This reset everytime the EC2 instance reset.
//        Needs to be changed again on demo day
const EC2_URL = "52.65.8.175";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5001', // local
  baseURL: `http://${EC2_URL}:5001`, // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
