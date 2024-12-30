<template>
  <div class="markdown" v-html="compiledMarkdown"/>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref, watch} from 'vue';
import {marked} from 'marked';
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
// 注意：这里的参数为解构赋值 { text, lang, escaped }
renderer.code = ({text, lang}) => {
  const language = lang || 'plaintext'; // 如果没有提供语言，默认为 plaintext
  // 使用 highlight.js 进行代码高亮
  const highlighted = hljs.highlight(text, {language}).value;
  return `
  <span>${language}</span>
  <pre><code class="hljs ${language}">${highlighted}</code></pre>
  `;
};

// 设置 MarkedOptions
const markedOptions = {
  gfm: true,             // 启用 GitHub 风格的 Markdown
  breaks: true,          // 启用换行
  headerIds: false,      // 不自动生成 ID
  mangle: false,         // 不对标题做变换
  renderer: renderer, // 使用默认渲染器
};

// 渲染 Markdown，设定为 async 函数
const renderMarkdown = async (content: string): Promise<string> => {
  return marked(content, markedOptions);
};

// 监控 Markdown 内容的变化
watch(() => props.content, async (newContent) => {
  compiledMarkdown.value = await renderMarkdown(newContent);
});

// 在组件挂载时渲染初始内容
onMounted(async () => {
  compiledMarkdown.value = await renderMarkdown(props.content);
});
</script>

<style scoped>

</style>
