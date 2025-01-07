import 'vant/lib/index.css';


import {createApp} from 'vue'
import {createPinia} from 'pinia'
import Vant from 'vant';
import Notify from 'vant'
import App from './App.vue'
import router from './router'

import vScroll from './utils/v-scroll.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vant);
app.use(Notify);

// 注册指令
app.directive('scroll', vScroll);

app.mount('#app')

