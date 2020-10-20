/**
 * 公共数据
 */

const storeFuncName = {'local': localStorage,'session': sessionStorage };
const isJsonString = (str: string) => {
    try {
      const obj = JSON.parse(str);
      return typeof obj == 'object' && obj;
    } catch (e) {
      return false;
    }
}
class AppStore {
  // 页面数据存储，默认存session中，
  // 如果需要存在local中，需要指定，获取的时候也需要指定
  setStoreItem(newItem: string, newValue: string | object, storeType: string = 'session'){
    storeFuncName[storeType].setItem(newItem, typeof newValue == 'object' ? JSON.stringify(newValue): newValue);
  }
  getStoreItem(itemName: string, storeType: string = 'session'){
    const sess = storeFuncName[storeType].getItem(itemName) || '';
    return isJsonString(sess) ?  JSON.parse(sess) : sess; 
  }
  removeStoreItem(itemNames: string | string[], storeType: string = 'session'){
    let remove = (item: string) => {
      storeFuncName[storeType].removeItem(item);
    }
    (typeof itemNames == "string") ? remove(itemNames) : itemNames.forEach(name => remove(name));
  }
  clear(storeType: string = 'session'){
    storeFuncName[storeType].clear();
  }
}
export default new AppStore();
