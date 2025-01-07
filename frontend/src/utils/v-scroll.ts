// v-scroll.js
export default {
  beforeMount(el) {
    const observer = new MutationObserver(() => {
      // 当元素内容变动的时候，滚动到最底部
      el.scrollTop = el.scrollHeight;
    });

    // 观察目标元素的子节点变化
    observer.observe(el, {
      childList: true,
      subtree: true,
    });

    // 保存观察者到元素的自定义属性中，供后续清理使用
    el.__vueScrollObserver__ = observer;
  },
  unmounted(el) {
    // 组件销毁时，清理观察者
    if (el.__vueScrollObserver__) {
      el.__vueScrollObserver__.disconnect();
      delete el.__vueScrollObserver__;
    }
  },
};
