import { http } from './http';
const prefixs = {
	flow: '',
	login: '',
	common: 'CRH-LIMNOS-CRH'
}
async function API(prefix, port, params=null){
	const tempObj = Object.assign({}, params);
	// 公共参数处理
	return await http.request(`/${prefixs[prefix]}${port}`, tempObj);
}

export { API };