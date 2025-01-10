// v-scroll.js
export default {
  beforeMount(el) {
    const observer = new MutationObserver(() => {
      // 每次子节点发生变化时，检查一下是否需要滚动
      const previousHeight = el.__vuePreviousHeight__ || 0; // 如果没有记录，初始为0

      if (previousHeight !== el.scrollHeight) {
        el.scrollTop = el.scrollHeight; // 只有高度发生变化时才滚动
        el.__vuePreviousHeight__ = el.scrollHeight; // 更新前一个高度
      }
    });

    // 观察目标元素的子节点和属性变化
    observer.observe(el, {
      childList: true,
      subtree: true,
      attributes: true, // 观察属性变化
    });

    // 保存观察者到元素的自定义属性中，供后续清理使用
    el.__vueScrollObserver__ = observer;
    el.__vuePreviousHeight__ = el.scrollHeight; // 初始化前一个高度
  },
  updated(el) {
    // 组件更新时，检查高度是否变化
    if (el.scrollHeight !== el.__vuePreviousHeight__) {
      el.scrollTop = el.scrollHeight; // 只有高度发生变化时才滚动
      el.__vuePreviousHeight__ = el.scrollHeight; // 更新前一个高度
    }
  },
  unmounted(el) {
    // 组件销毁时，清理观察者
    if (el.__vueScrollObserver__) {
      el.__vueScrollObserver__.disconnect();
      delete el.__vueScrollObserver__;
      delete el.__vuePreviousHeight__;
    }
  },
};
