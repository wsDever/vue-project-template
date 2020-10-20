import Vue from 'vue';
import {Button, message, Result} from 'ant-design-vue'
import wsToast from '@baseComp/toast/index.js'

import 'ant-design-vue/dist/antd.css';
export default function initUi(){
	Vue.use(Button).use(message).use(Result);
	Vue.use(wsToast);
	Vue.prototype.$message = message;
}