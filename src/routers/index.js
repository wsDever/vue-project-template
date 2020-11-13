import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let routeArr = []

let files = require.context('../pages', true, /index.vue$/);
// 只读一级子目录
let pages = files.keys().filter(item => item.split("/").length == 3);

pages.forEach(item => {
	let path = item.split("/")[1];
	// let fileUrl = item.replace(/\.\//g, '../pages/')
	let name = files(item).default.name;
	routeArr.push({
		path: `/${path}`,
		name: `${name}`,
		meta: { title: `${name}` },
		component: () => import(`../pages/${path}/`)
	})
})

// 对routerArr 添加 404  index 等路由
// 生产环境下删除测试路由等

let router = new Router({
  mode:'history',
  routes: [ ...routeArr ]
});

/**
 * 拦截
*/
router.beforeEach((to, from, next) => {
  // 自动回滚顶部
  window.scrollTo(0, 0);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export {  router };
