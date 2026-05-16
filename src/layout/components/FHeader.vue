<script setup>
import Drawer from "~/components/Drawer.vue";
import { useFullscreen } from "@vueuse/core";
import { userepassword, uselogout } from "~/composables/usemanager";
import { useUserStore } from "~/store";
//公共数据仓库
const store = useUserStore();
const { isFullscreen, toggle } = useFullscreen();

//处理刷新页面功能
const handleRefresh = () => {
  location.reload();
};

//修改密码功能
const { formDrawerRef, ruleForm, ruleFormRef, rules, onsubmit, repassword } =
  userepassword();

//退出登录功能
const { handleLogout } = uselogout();

const handleSwitch = (command) => {
  switch (command) {
    case "repassword":
      repassword();
      break;
    case "logout":
      handleLogout();
      break;
  }
};
</script>
<template>
  <div class="f-header">
    <div class="logo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      skywolf编程
    </div>

    <el-icon class="icon" @click="store.handleAsideWidth()">
      <Fold v-if="store.asideWidth == '250px'" />
      <Expand v-else />
    </el-icon>

    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="right">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown size="default" @command="handleSwitch">
        <div class="dropdown">
          <el-avatar :size="25" :src="store.user.avatar" class="mx-1" />
          <span>{{ store.user.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="repassword"> 修改密码 </el-dropdown-item>
            <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <Drawer title="修改密码" ref="formDrawerRef" @submit="onsubmit">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item prop="oldpassword" label="旧密码:">
        <el-input v-model="ruleForm.oldpassword" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item prop="password" label="新密码:">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码:">
        <el-input
          v-model="ruleForm.repassword"
          placeholder="请输入确认密码"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>
  </Drawer>
  <!-- 抽屉组件 -->
  <!-- <el-drawer
    v-model="drawer"
    title="修改密码"
    :close-on-click-modal="false"
    size="45%"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item prop="oldpassword" label="旧密码:">
        <el-input v-model="ruleForm.oldpassword" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item prop="password" label="新密码:">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码:">
        <el-input
          v-model="ruleForm.repassword"
          placeholder="请输入确认密码"
          type="password"
          show-password
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm">
          提交
        </el-button>
        <el-button @click="handleCancel"> 取消 </el-button>
      </el-form-item>
    </el-form>
  </el-drawer> -->
</template>

<style scoped>
.f-header {
  @apply h-[64px] bg-indigo-700 fixed top-0 bottom-0 left-0 right-0 flex items-center;
}
.f-header .logo {
  @apply text-light-50 flex mx-[65px] justify-center items-center text-xl font-thin;
}
.f-header .icon {
  @apply text-light-50 w-[42px] h-[64px] hover:bg-indigo-600 cursor-pointer;
}
.f-header .right {
  @apply ml-auto flex justify-center items-center;
}
.right .dropdown {
  @apply flex mx-3 text-light-50 items-center justify-center cursor-pointer;
}
</style>
