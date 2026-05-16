<template>
  <div class="button-example">
    <div class="button-row">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>

    <div class="button-row">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </div>

    <div class="button-row">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </div>

    <div class="button-row">
      <el-button dashed>Dashed</el-button>
      <el-button type="primary" dashed>Primary</el-button>
      <el-button type="success" dashed>Success</el-button>
      <el-button type="info" dashed>Info</el-button>
      <el-button type="warning" dashed>Warning</el-button>
      <el-button type="danger" dashed>Danger</el-button>
    </div>

    <div class="button-row">
      <el-button icon="Search" circle />
      <el-button type="primary" icon="Edit" circle />
      <el-button type="success" icon="Check" circle />
      <el-button type="info" icon="Message" circle />
      <el-button type="warning" icon="Star" circle />
      <el-button type="danger" icon="Delete" circle />
    </div>
  </div>

  <el-icon><User /></el-icon>
  <el-icon><Lock /></el-icon>
  <!-- 使用windiCSS -->y
  <div class="content">中间</div>
  <Formuse />
</template>

<script setup>
import Formuse from "./Formuse.vue";
</script>

<style scoped>
.button-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.button-row > * {
  margin: 0;
}
.content {
  width: 200px;
  height: 200px;
  border: 1px solid gray;
  @apply bg-pink-300 ml-20 rounded;
}
</style>
