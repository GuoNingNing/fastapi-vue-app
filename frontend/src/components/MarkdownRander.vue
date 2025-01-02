<template>
  <div class="markdown" v-html="compiledMarkdown"/>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch, nextTick } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
// 导入所需的主题
import 'highlight.js/styles/github.css'; // 示例：选择 GitHub 主题

const props = defineProps<{
  content: string; // 接受一个 Markdown 字符串作为 props
}>();

const compiledMarkdown = ref('');

// 自定义 Renderer
const renderer = new marked.Renderer();

// 重写代码块渲染方法
renderer.code = ({ text, lang }) => {
  const language = lang || 'plaintext'; // 如果没有提供语言，默认为 plaintext
  // 使用 highlight.js 进行代码高亮
  const highlighted = hljs.highlight(text, { language }).value;
  return `
  <div><span>${language}</span><button class="copy-button">复制</button>
  <pre><code class="hljs ${language}">${highlighted}</code></pre>
  </div>
  `;
};

// 设置 MarkedOptions
const markedOptions = {
  gfm: true,             // 启用 GitHub 风格的 Markdown
  breaks: true,          // 启用换行
  headerIds: false,      // 不自动生成 ID
  mangle: false,         // 不对标题做变换
  renderer: renderer,    // 使用自定义渲染器
};

// 渲染 Markdown，设定为 async 函数
const renderMarkdown = async (content: string): Promise<string> => {
  return marked(content, markedOptions);
};

// 监控 Markdown 内容的变化
watch(() => props.content, async (newContent) => {
  compiledMarkdown.value = await renderMarkdown(newContent);
});

// 复制到剪贴板的方法
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
}

// 在组件挂载时渲染初始内容
onMounted(async () => {
  compiledMarkdown.value = await renderMarkdown(props.content);

  // 使用 nextTick 确保 DOM 渲染完毕
  await nextTick(() => {
    const buttons = document.querySelectorAll('.copy-button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        // 使用 button 的父元素查找 code
        const codeBlock = button.closest('div')?.querySelector('code');
        if (codeBlock) {
          copyToClipboard(codeBlock.innerText);
        }
      }, { once: true });
    });
  });
});
</script>

<style scoped>
.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.copy-button:hover {
  background-color: #0056b3;
}
</style>
