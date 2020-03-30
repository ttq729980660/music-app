<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {mapGetters} from 'vuex'
import {Song, filterSinger} from 'common/js/song'

export default {
  computed: {
    title() {
      return this.topList.topTitle
    },
    ...mapGetters([
      'topList'
    ])
  },
  data() {
    return {
      songs: [],
      rank: true,
      // eslint-disable-next-line vue/no-dupe-keys
      bgImage: ''
    }
  },
  created () {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        // eslint-disable-next-line no-useless-return
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.bgImage = res.data.data.mbFrontPicUrl
          this.songs = this._normalizeSongs(res.data.songInfoList)
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
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
