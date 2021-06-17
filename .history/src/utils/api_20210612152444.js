import axios from "axios"
import { cilHttps } from "@coreui/icons";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const HttpsProxyAgent = require('https-proxy-agent');

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  cancelToken: source.token,
  proxy: false,
  httpsAgent: new HttpsProxyAgent('http://localhost:8770/'),
  withCredentials: true
})

export default api
