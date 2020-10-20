import Axios from 'axios';
import Evbus from '@javascript/evbus';

const xhr = Axios.create({
	withCredentials: false,
  	timeout: 1000 * 60
});
let requestLists = [];
let cancelToken = Axios.CancelToken;

//   特别说明
//   请求部分的事件管理 需要在页面中完成对 httpEvbus 事件的绑定及具体实现
const httpEvbus = new Evbus();

// 重复提交处理
const removeRepeatRequest = (res) => {
	for(let rq in requestLists){
		if(requestLists[rq].url == `${res.url}&${res.method}`){
			requestLists[rq].fncc();
			requestLists.splice(rq, 1)
		}
	}
}



/**
 * 请求拦截
*/
xhr.interceptors.request.use(
  config => {
	removeRepeatRequest(config)
	config.cancelToken = new cancelToken((cc) => {
		requestLists.push({url: `${config.url}&${config.method}`, fncc: cc})
	})
	httpEvbus.emit('http.loading', true);
    return config;
  },
  error => {
	httpEvbus.emit('request.error', error);
	// return Promise.reject(error);
  }
);

/**
 * 反馈拦截
 */
xhr.interceptors.response.use(
  response => {
	removeRepeatRequest(response.config);
	httpEvbus.emit('http.loading',false);
	if(response.data.error.error_no != 0){
		handleError(response.data)
	}
    return response;
  },
  error => {
	httpEvbus.emit('response.error', error);
    // return Promise.reject(error);
  }
);

// 接口报错处理
const handleError = (data) => {
	httpEvbus.emit('response.error', data.error_info);
	if (data.logger_error_path) {
	  console.error("错误接口是：" + data.logger_error_path + "\n");
	}
	console.warn("错误信息是：" + data.error_info);
}

class Http{
  xhr = xhr;
  /**
   * 请求整合
   * @param method
   * @param url
   * @param data
   */
  async request(
    // method: 'get' | 'post' = 'get',
    url: string,
    data: object = {}
  ) {
    const result = await this.xhr({
      method: `get`,
      url: url,
      data: data,
    })
    return result.data;
  }
}
const http = new Http();
export { httpEvbus, http }
