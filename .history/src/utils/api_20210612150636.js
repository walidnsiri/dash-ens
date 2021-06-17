import axios from "axios"
import { cilHttps } from "@coreui/icons";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  cancelToken: source.token,
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 8770
  }
})

export default api
