<script setup>
import { useTabs } from "~/composables/useTabList";
const { store, activeTab, handleChange, removeTab, tabs, handleClose } =
  useTabs();
</script>
<template>
  <div class="f-tag-list" :style="{ left: store.asideWidth }">
    <span class="tabs" style="min-width: 100px">
      <el-tabs
        v-model="activeTab"
        type="card"
        class="demo-tabs"
        style="min-width: 100px"
        tab-position="top"
        @tab-change="handleChange"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in tabs"
          :key="item.path"
          :label="item.name"
          :name="item.path"
          :closable="item.path != '/'"
        >
        </el-tab-pane>
      </el-tabs>
    </span>

    <span class="drop-list">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>
<style scoped>
.f-tag-list {
  @apply h-[44px]  fixed right-0 top-[64px] right-0 px-2 flex items-center bg-gray-100;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.drop-list {
  @apply w-[32px] h-[32px]   ml-auto flex items-center justify-center cursor-pointer bg-light-50;
}
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav),
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border: none;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  @apply mx-1 bg-light-50 rounded h-[32px];
}
:deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
  line-height: 31px;
}
</style>
