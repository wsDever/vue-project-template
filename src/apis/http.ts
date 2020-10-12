import Axios from 'axios';

const xhr = Axios.create({
	withCredentials: false,
  	timeout: 1000 * 60
});
/**
 * 请求拦截
*/
xhr.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 反馈拦截
 */
xhr.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default class {
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
