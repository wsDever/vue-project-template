
import Vue from 'vue';
import App from './app';
import { router } from '@router/';

console.log('当前运行环境:', __ENV__);

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});


