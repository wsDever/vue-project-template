import Vue from 'vue';
import Store from '@store/localStore';
import Axios from 'axios'
export default{
	getRunDevideEnv:() => {
		let uagent = navigator.userAgent.toLowerCase()
		let str = /mobile|android|iphone|ipad|phone/i
	  	console.log("当前手机类型：", uagent);
		// Store.setStoreItem("dec_env", dec, "local");
	},
	getWebConfig: async () => {
		try{
			const configData = await Axios({
			  method: 'get',
			  url: `../src/config.json?_=${Date.now()}`
			})
			Store.setStoreItem("webConfig", configData.data, "local");
		  }catch(e){
			throw "请配置config.json" 
		  }
	},
	initApp: function(){
		this.getRunDevideEnv();

		// 打开调试
		if(__ENV__ !== 'production'){
			import("vconsole").then((res) => {
		  		new res.default();
			})
		}
		// 获取web配置  
		this.getWebConfig();
		
		//   引入sdk
		
		// 引入测试数据
		/*  {
			  do something
			}
		*/ 


		// ......
	  	
	}
  }