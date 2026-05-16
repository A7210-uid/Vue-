import { createApp } from "vue";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import "./style.css";
import "element-plus/dist/index.css";
import "virtual:windi.css";
import "nprogress/nprogress.css";
import App from "./App.vue";
import { router } from "./router";
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import directives from "./directives";

let app = createApp(App);

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 注册路由和权限控制
import "~/permission.js";

// 注册Pinia
const pinia = createPinia();

// 注册自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key]);
});

// 挂载应用
app.use(ElementPlus).use(router).use(pinia).mount("#app");
