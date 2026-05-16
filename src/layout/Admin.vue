<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
import { computed } from "vue";

import { useUserStore } from "~/store";
const store = useUserStore();

const leftV = computed(() => parseInt(store.asideWidth) + 10 + "px");
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <f-header />
      </el-header>
      <el-container>
        <el-aside :width="store.asideWidth">
          <f-menu />
        </el-aside>
        <el-main>
          <f-tag-list />
          <div class="content" :style="{ left: leftV }">
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <keep-alive :include="store.cachedViews" :max="10">
                  <component :is="Component"></component>
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.content {
  @apply fixed  right-[10px] top-[118px] bottom-[10px]  overflow-y-auto;
  scrollbar-width: none;
}

/* 页面切换动画样式 */
/* fade-transform 动画进入开始状态 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

/* 进入开始：透明度为0，向右偏移20px */
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

/* 离开结束：透明度为0，向左偏移20px */
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
