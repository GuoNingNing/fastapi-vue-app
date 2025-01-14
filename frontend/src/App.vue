<template>
  <div id="main"  class="app-container">
    <router-view />
  </div>
</template>

<script lang="ts">

import { useWindowSize } from '@vant/use'
import { computed, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const { width, height } = useWindowSize()
    const appWidth = computed(() => `${width.value}px`)
    const appHeight = computed(() => `${height.value}px`)

    // onMounted(() => {
    //   console.log('App mounted')
    //   // DOM加载完毕，向上滚动一个像素
    //   window.scrollTo(0, 100)
    // })

    return { appWidth, appHeight }
  }
}
</script>
