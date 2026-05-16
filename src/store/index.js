import { defineStore } from "pinia";
import { login, getinfo, logout } from "~/api/manager";
import { setcookie } from "~/composables/auth";
import { delcookie } from "../composables/auth";

export const useUserStore = defineStore("user", {
  //1.状态
  state() {
    return {
      user: {},
      menus: [],
      asideWidth: "250px",
      hasgetInfo: false,
      cachedViews: [], // 缓存的页面列表
    };
  },
  //2.动作
  actions: {
    handleAsideWidth() {
      this.asideWidth = this.asideWidth == "250px" ? "64px" : "250px";
    },
    // 添加缓存页面
    addCachedView(view) {
      if (!this.cachedViews.includes(view)) {
        this.cachedViews.push(view);
      }
    },
    // 移除缓存页面
    removeCachedView(view) {
      const index = this.cachedViews.indexOf(view);
      if (index > -1) {
        this.cachedViews.splice(index, 1);
      }
    },
    // 重置缓存
    resetCachedViews() {
      this.cachedViews = [];
    },
    login(username, password) {
      return new Promise((resolve, reject) => {
        try {
          login(username, password).then((res) => {
            setcookie(res.token);
            resolve(res);
          });
        } catch (error) {
          // console.log(error.response.data.msg);
          reject(error.response.data.msg);
        }
      });
    },
    //退出登录功能
    async logout() {
      try {
        await logout();
        //移除cookie
        delcookie();
        this.user = {};
        this.hasgetInfo = false;
      } catch {
        throw err;
      }
    },
    getinfo() {
      return new Promise((resolve, reject) => {
        getinfo().then((res) => {
          this.user = res;
          this.menus = res.menus;
          resolve(res);
        });
      });
    },
  },
});
