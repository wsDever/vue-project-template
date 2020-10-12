import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * meta 里可以加入一些客户特殊需求的参数
 * title 控制页面标题
 * topNavbar 控制页面顶部的导航条样式, 0为不显示，1,2,3,4..可以分别对应到 partial/navbar/top 里的样式
*/
let routerPageMap = {
  index: {
    path: '/',
    name: 'home_index',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "home_index" */ '@page/home_index/')
  },
};

// 非开发环境删除无用的路由 
// if (__ENV__ == 'production') {
//   delete routerPageMap.test;
// }

let router = new Router({
  mode:'history',
  routes: Object.keys(routerPageMap).map(key => {
    return {
      ...routerPageMap[key]
    }
  })
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
