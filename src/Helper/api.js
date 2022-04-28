import axios from "axios";

export default axios.create({
  //baseURL: 'http://10.227.183.92:8082'
  //baseURL: `http://192.168.1.147:8082`,
  //baseURL:'http://10.227.118.210:8082'
  baseURL:'http://localhost:8082'
});
