<template>
  <!-- 侧边弹出层 -->
  <div v-if="showMenu" class="side-menu-overlay" @click="closeMenu">
    <div class="side-menu" @click.stop>
      <slot name="header"></slot>
      <van-divider />
      <!-- 这里可以嵌套其他内容或组件 -->
      <slot name="default"></slot>  <!-- 使用插槽插入内容 -->
      <van-tabbar>
        <slot name="footer"></slot>
      </van-tabbar>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// 用于接收外部控制 show 状态的 prop
const props = defineProps({
  show: Boolean
})
// 用于控制显示状态的变量
const showMenu = ref(false)

// 监听 modelValue 变化
watch(() => props.show, (newVal) => {
  console.log('showValue', newVal)
  showMenu.value = newVal
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
// 关闭侧边栏
const closeMenu = () => {
  showMenu.value = false
  emit('update:show', false)
}


const value = ''

</script>

<style scoped>
/* 遮罩层样式 */
.side-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* 侧边栏样式 */
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* 控制侧边栏宽度 */
  height: 100vh;
  padding: 10px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0 10px 10px 0;
  transform: translateX(-100%); /* 初始位置在屏幕外 */
  transition: transform 1.5s ease-in-out;
  z-index: 1001;
}

.side-menu-overlay .side-menu {
  transform: translateX(0); /* 侧边栏弹出 */
}
</style>
