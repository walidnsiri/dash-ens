import axios from "axios"
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}api/`,
  cancelToken: source.token
})

export default api
