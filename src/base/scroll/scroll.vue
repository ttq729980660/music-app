<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
export default {
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    resizePolling: {
      type: Number,
      default: 60
    }
  },
  mounted () {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return false
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        scrollY: true,
        click: this.click,
        resizePolling: this.resizePolling
      })
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
