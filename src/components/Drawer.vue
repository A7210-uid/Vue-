<script setup>
import { ref } from "vue";

const drawer = ref(false);

defineProps({
  title: {
    type: String,
  },
  size: {
    type: String,
    default: "45%",
  },
  confirmText: {
    type: String,
    default: "确认提交",
  },
});

const loading = ref(false);

//打开进度条
const openloading = () => (loading.value = true);
//关闭进度条
const closeloading = () => (loading.value = false);

//打开抽屉
const opendrawer = () => (drawer.value = true);

//关闭抽屉
const closedrawer = () => (drawer.value = false);

defineExpose({
  openloading,
  closeloading,
  opendrawer,
  closedrawer,
});

//提交的方法在FHeader组件里面去实现
const emit = defineEmits(["submit"]);
const submit = () => emit("submit");
</script>
<template>
  <el-drawer
    v-model="drawer"
    :title="title"
    :close-on-click-modal="false"
    :size="size"
  >
    <div class="drawer">
      <div class="body">
        <!-- 插槽 -->
        <slot></slot>
      </div>
      <div class="action">
        <el-button type="primary" :loading="loading" @click="submit">
          {{ confirmText }}
        </el-button>
        <el-button @click="closedrawer"> 取消 </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style>
.drawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.drawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.drawer .action {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
