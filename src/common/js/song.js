import {getSongUrl} from 'api/song'
import {ERR_OK} from 'api/config'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }
  getSongAudioSrc() {
    if (this.url) {
      return Promise.resolve(this.url)
    }
    return new Promise((resolve, reject) => {
      getSongUrl(this.mid).then((res) => {
        if (res.code === ERR_OK) {
          let purl = res.req_0.data.midurlinfo[0].purl
          this.url = purl ? `http://isure.stream.qqmusic.qq.com/${purl}` : ''
          resolve(this.url)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('no url')
        }
      })
    })
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((i) => {
    ret.push(i.name)
  })
  return ret.join('/')
}
