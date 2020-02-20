<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active : currentPageIndex === idx}" v-for="(item,idx) in dots" :key="idx"></span>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slider from '@better-scroll/slide'
import {addClass} from 'common/js/dom'
BScroll.use(Slider)
export default {
  name: 'slider',
  props: {
    loop: {
      Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()
      if (this.autoPlay) {
        this.play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this.setSliderWidth(true)
      this.slider.refresh()
    })
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    initSlider() {
      let _self = this
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: _self.loop,
          threshold: 0.3,
          speed: 400
        },
        useTransition: true
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        this.play()
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    nextPage() {
      this.slider.next()
    },
    initDots() {
      this.dots = new Array(this.children.length)
    },
    play() {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        this.nextPage()
      }, 4000)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      margin-top: -12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
