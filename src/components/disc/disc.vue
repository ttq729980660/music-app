<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getDiscDetail} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {Song, filterSinger} from 'common/js/song'
import {mapGetters} from 'vuex'

export default {
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getDiscDetail(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        if (item.id && item.album.id) {
          const newSong = new Song({
            id: item.id,
            mid: item.mid,
            singer: filterSinger(item.singer),
            name: item.name,
            album: item.album.name,
            duration: item.interval,
            image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`
          })
          ret.push(newSong)
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
