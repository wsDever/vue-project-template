/**
 * Type Class 全局缓存类
 * 
 * @author wushang
 */
export default {
  async getUrlParams(parm) {
    return new Promise(resolve => {
      let reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)", "i");
      let params = window.location.href.split("?")[1];
      if (!params) {
        resolve();
      }
      let r = params.match(reg);
      if (!r) {
        resolve();
      }
      resolve(unescape(r[2]));
    })
  },
  
}