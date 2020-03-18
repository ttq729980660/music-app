<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSinger} from 'common/js/singer'
import {mapMutations} from 'vuex'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'singer',
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _normalizeSinger(list) {
      let smap = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          smap.hot.items.push(createSinger(item))
        }
        const key = item.Findex
        if (!smap[key]) {
          smap[key] = {
            title: key,
            items: []
          }
        }
        smap[key].items.push(createSinger(item))
      })
      // 为了得到有序列表，把smap转化成数组
      let ret = []
      let hot = []
      for (let key in smap) {
        let val = smap[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
