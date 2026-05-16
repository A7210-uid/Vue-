import { createWebHashHistory, createRouter } from "vue-router";

import Index from "~/pages/Index.vue";
import Login from "~/pages/Login.vue";
import NotFound from "~/pages/404.vue";
import Admin from "~/layout/Admin.vue";
import GoodsList from "~/pages/goods/list.vue";
import CategoryList from "~/pages/category/list.vue";
import SkusList from "~/pages/skus/list.vue";
import CouponList from "~/pages/coupon/list.vue";
import UserList from "~/pages/user/list.vue";
import LevelList from "~/pages/level/list.vue";
import OrderList from "~/pages/order/list.vue";
import CommentList from "~/pages/comment/list.vue";
import ManagerList from "~/pages/manager/list.vue";
import AccessList from "~/pages/access/list.vue";
import RoleList from "~/pages/role/list.vue";
import SettingBase from "~/pages/setting/base.vue";
import SettingBuy from "~/pages/setting/buy.vue";
import SettingShip from "~/pages/setting/ship.vue";
import DistributionIndex from "~/pages/distribution/index.vue";
import DistributionSetting from "~/pages/distribution/setting.vue";
import ImageList from "~/pages/image/list.vue";
import NoticeList from "~/pages/notice/list.vue";

const routes = [
  {
    path: "/",
    name: "admin",
    component: Admin,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "登录页" },
  },
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const asyncRoutes = [
  { path: "/", component: Index, meta: { title: "首页" } },
  {
    path: "/goods/list",
    component: GoodsList,
    meta: { title: "商品列表页" },
  },
  {
    path: "/category/list",
    component: CategoryList,
    meta: { title: "分类列表页" },
  },
  {
    path: "/skus/list",
    component: SkusList,
    meta: { title: "规格管理页面" },
  },
  {
    path: "/coupon/list",
    component: CouponList,
    meta: { title: "优惠劵列表" },
  },
  {
    path: "/user/list",
    component: UserList,
    meta: { title: "用户列表" },
  },
  {
    path: "/level/list",
    component: LevelList,
    meta: { title: "会员等级" },
  },
  {
    path: "/order/list",
    component: OrderList,
    meta: { title: "订单列表" },
  },
  {
    path: "/comment/list",
    component: CommentList,
    meta: { title: "评论列表" },
  },
  {
    path: "/manager/list",
    component: ManagerList,
    meta: { title: "管理员管理" },
  },
  {
    path: "/access/list",
    component: AccessList,
    meta: { title: "权限管理" },
  },
  {
    path: "/role/list",
    component: RoleList,
    meta: { title: "角色管理" },
  },
  {
    path: "/setting/base",
    component: SettingBase,
    meta: { title: "配置" },
  },
  {
    path: "/setting/buy",
    component: SettingBuy,
    meta: { title: "支付设置" },
  },
  {
    path: "/setting/ship",
    component: SettingShip,
    meta: { title: "物流设置" },
  },
  {
    path: "/distribution/index",
    component: DistributionIndex,
    meta: { title: "分销员管理" },
  },
  {
    path: "/distribution/setting",
    component: DistributionSetting,
    meta: { title: "分销设置" },
  },
  {
    path: "/image/list",
    component: ImageList,
    meta: { title: "图库管理" },
  },
  {
    path: "/notice/list",
    component: NoticeList,
    meta: { title: "公告列表" },
  },
];

//动态添加路由方法
//遍历menus的子项，还需要不间断的把它的child里面的所有项都遍历一篇
//[{name:'Admin',path:'/',child:[name:'school',path:'/school',child:[]]}]
export const addAsyncRoute = (menus) => {
  const findAndAddRoute = (array) => {
    array.forEach((item) => {
      //查找菜单中有与asyncRoutes匹配的项
      let findItem = asyncRoutes.find((v) => v.path === item.frontpath);
      if (findItem) router.addRoute("admin", findItem);
      if (item.child && item.child.length > 0) findAndAddRoute(item.child);
    });
  };
  findAndAddRoute(menus);
};
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
