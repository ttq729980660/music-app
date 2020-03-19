import {Url} from './config'
import axios from 'axios'

export function getSongUrl (songId) {
  return axios.get(`${Url}/getMusicVKey`, {
    params: {
      songmid: songId
    }
  }).then((res) => {
    return Promise.resolve(res.data.response)
  })
}
