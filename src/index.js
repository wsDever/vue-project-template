
import Vue from 'vue';
import App from './app';
import { router } from '@router/';
import {Button, message, Result} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Button).use(message).use(Result);

Vue.prototype.$message = message;

console.log('当前运行环境:', __ENV__);

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});


