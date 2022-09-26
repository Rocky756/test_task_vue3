import { createApp } from 'vue';
import Antd from 'ant-design-vue'
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store';

// createApp(App).use(store).use(router).mount('#app');
createApp(App).use(Antd).use(router).use(store)
.mount('#app');
