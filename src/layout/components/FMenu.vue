<script setup>
import { useUserStore } from "~/store";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const store = useUserStore();
const router = useRouter();
const route = useRoute();
const isCollapse = computed(() => {
  // 返回 true = 折叠 | false = 展开
  return store.asideWidth !== "250px";
});

//菜单激活功能
const handleSelect = (e) => {
  router.push(e);
};

//路由路径反哺激活菜单
const defaultActive = computed(() => {
  return route.path;
});
</script>
<template>
  <div class="f-menu" :style="{ width: store.asideWidth }">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo h-full"
      :collapse="isCollapse"
      unique-opened
      :collapse-transition="false"
      @select="handleSelect"
    >
      <template v-for="(item, index) in store.menus" :key="index">
        <el-sub-menu :index="item.name" v-if="item.child.length > 0">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index) in item.child"
            :key="index"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon" />
            </el-icon>
            <template #title>{{ item2.name }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="item.name" v-else>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.f-menu {
  @apply bg-rose-200 fixed top-[64px] bottom-0 left-0 right-0;
}
</style>
