import { router } from "~/router";
import { getcookie } from "~/composables/auth";
import { toast } from "~/composables/util";
import { hideFullLoading, showFullLoading } from "~/composables/util";
import { useUserStore } from "~/store";
import { addAsyncRoute } from "~/router";

//放置外面，作为全局变量来使用
// let hasgetInfo = false;
//导航前置守卫

router.beforeEach(async (to, from, next) => {
  // ...
  // 返回 false 以取消导航
  const store = useUserStore();
  showFullLoading();
  let token = getcookie();
  if (token && to.path === "/login") {
    let apath = from.path ? from.path : "/";
    toast({ message: "请勿重复登录", type: "error" });
    next({ path: apath });
    return;
  }
  //防止恶意跳转
  if (!token && to.path !== "/login") {
    toast({ message: "请先登录", type: "warning" });
    next({ path: "/login" });
    return;
  }

  //如果已经登录了，需要获取用户数据信息
  if (token && !store.hasgetInfo) {
    await store.getinfo();
    store.hasgetInfo = true;
    //打印菜单数据
    addAsyncRoute(store.menus);
    return next({ path: to.path });
  }
  let title = to.meta.title ? to.meta.title : "";
  title = "skywolf商城网站-" + title;
  document.title = title;

  return next();
  // return hasNewRoutes ? next({ path: to.path }) : next();
  // return false;
});

//导航后置守卫
router.afterEach(() => {
  hideFullLoading();
});
