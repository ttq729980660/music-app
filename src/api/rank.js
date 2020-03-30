import {Url} from './config'
import axios from 'axios'

export function getTopList () {
  return axios.get(`${Url}/getTopLists`).then((res) => {
    return Promise.resolve(res.data.response)
  })
}

export function getMusicList (topId) {
  return axios.get(`${Url}/getRanks`, {
    params: {
      topId
    }
  }).then((res) => {
    return Promise.resolve(res.data.response.detail)
  })
}
