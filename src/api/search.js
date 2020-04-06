import {Url} from './config'
import axios from 'axios'

export function getHotKey() {
  return axios.get(`${Url}/getHotkey`).then((res) => {
    return Promise.resolve(res.data.response)
  })
}

export function getSearchByKey (key, catZhida, page, limit) {
  return axios.get(`${Url}/getSearchByKey`, {
    params: {
      key,
      catZhida,
      page,
      limit
    }
  }).then((res) => {
    return Promise.resolve(res.data.response)
  })
}
