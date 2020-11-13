
import Vue from 'vue';
import App from './app';
import { router } from '@router/';
import initUi from '@javascript/ui.js';
import Evbus from '@javascript/evbus'
// 初始化Ui 
initUi()

console.log('当前运行环境:', __ENV__);

// 全局事件管理中心
Vue.prototype.$App = {
	Ev: new Evbus()
};

import('@javascript/middleware').then(res => {
	res.default.initApp();
	new Vue({
		el: '#app',
		router,
		render: h => h(App)
	});
})
