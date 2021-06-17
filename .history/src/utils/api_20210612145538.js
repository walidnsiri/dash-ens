import axios from "axios"
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const api = axios.create({
  url: `${process.env.REACT_APP_API_URL}`,
  cancelToken: source.token,
  proxy: {
    host: '127.0.0.1',
    port: 8770
  }
})

export default api
