import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/store";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

export const useTabs = () => {
  const route = useRoute();
  const router = useRouter();
  const store = useUserStore();
  // 缓存key（自定义）
  const STORAGE_KEY = "APP_TABS_LIST";
  // 当前激活标签
  const activeTab = computed(() => route.path);
  // 标签页列表
  const tabs = ref([]);
  // ============= 核心：localStorage 读写方法 =============
  // 读取缓存
  const getStorageTabs = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [{ name: "后台首页", path: "/" }];
    } catch (e) {
      return [{ name: "后台首页", path: "/" }];
    }
  };
  // 保存到缓存
  const setStorageTabs = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };
  // ============= 标签页操作方法 =============
  // 初始化：页面加载读取缓存
  onMounted(() => {
    tabs.value = getStorageTabs();
  });
  // 添加标签
  const addItem = (item) => {
    const index = tabs.value.findIndex((v) => v.path === item.path);
    if (index === -1) {
      tabs.value.push(item);
      setStorageTabs(tabs.value); // 同步缓存
    }
  };
  //监听路由变化，构建item
  //item如果不存在于tabs里面，则添加进去
  onBeforeRouteUpdate((to) => {
    let item = {
      name: to.meta.title,
      path: to.path,
    };
    addItem(item);
  });
  //删除tab的操作
  const removeTab = (path) => {
    //激活菜单与删除菜单相同
    if (path === activeTab.value) {
      tabs.value.forEach((item, index) => {
        if (item.path === activeTab.value) {
          const actV = tabs.value[index + 1] || tabs.value[index - 1];
          activeTab.value = actV.path;
          //跳转到激活页
          router.push(actV.path);
        }
      });
    }
    tabs.value = tabs.value.filter((item) => item.path != path);
    setStorageTabs(tabs.value);
  };
  //处理关闭按钮操作
  const handleClose = (e) => {
    switch (e) {
      case "closeOther":
        closeOther();
        break;
      case "closeAll":
        closeAll();
        break;
    }
  };
  //关闭其他的按钮操作
  const closeOther = () => {
    tabs.value = tabs.value.filter(
      (item) => item.path == "/" || item.path === activeTab.value
    );
    setStorageTabs(tabs.value);
  };
  //关闭所有的按钮操作
  const closeAll = () => {
    tabs.value = tabs.value.filter((item) => item.path == "/");
    router.push("/");
    setStorageTabs(tabs.value);
  };
  //实现标签页点击跳转
  const handleChange = (path) => {
    router.push(path);
  };
  return { store, activeTab, handleChange, removeTab, tabs, handleClose };
};
