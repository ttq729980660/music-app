// import jsonp from 'common/js/jsonp'
import {commonParams, Url} from './config'
import axios from 'axios'

export function getRecommend () {
  // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // const data = Object.assign({}, commonParams, {
  //   platform: 'h5',
  //   uin: 0,
  //   needNewCode: 1
  // })
  // return jsonp(url, data, options)
  return axios.get(`${Url}/getRecommend`).then((res) => {
    return Promise.resolve(res.data.response.focus)
  })
}

export function getDiscList () {
  const url = 'api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscDetail (disstid) {
  return axios.get(`${Url}/getSongListDetail`, {
    params: {
      disstid
    }
  }).then((res) => {
    return Promise.resolve(res.data.response)
  })
}
