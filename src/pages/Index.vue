<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in panels"
        :key="index"
      >
        <el-card shadow="hover" class="stats-card">
          <template #header>
            <div class="pay-title">
              <span class="title-text">{{ item.title }}</span>
              <el-tag :type="item.unitColor || 'info'" class="bg-light-50" round size="small">{{
                item.unit
              }}</el-tag>
            </div>
          </template>
          <!-- card body -->
          <div class="num">
            <count-to :value="item.value" :duration="1.5" :decimals="0" />
          </div>
          <el-divider direction="horizontal" content-position="center" />
          <div class="subnum">
            <span class="sub-title">{{ item.subTitle }}</span>
            <span class="sub-value">{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 骨架屏加载效果 -->
    <div v-if="panels.length == 0" class="skeleton-container">
      <el-row :gutter="20">
        <el-col v-for="i in 4" :key="i" :span="6">
          <el-card shadow="always" class="stats-card">
            <template #header>
              <div class="pay-title">
                <el-skeleton-item variant="text" style="width: 40%" />
                <el-skeleton-item variant="text" style="width: 20%" />
              </div>
            </template>
            <div class="num">
              <el-skeleton-item variant="text" style="width: 50%" />
            </div>
            <el-divider direction="horizontal" content-position="center" />
            <div class="subnum">
              <el-skeleton-item variant="text" style="width: 30%" />
              <el-skeleton-item variant="text" style="width: 40%" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <index-navs />
    <el-row :gutter="20" class="mt-4">
      <el-col :span="12" :offset="0">
        <index-chart />
      </el-col>
      <el-col :span="12" :offset="0"></el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getStatistics1 } from "~/api";
import IndexNavs from "~/components/IndexNavs.vue";
import CountTo from "~/components/CountTo.vue";
import IndexChart from "~/components/IndexChart.vue";

const panels = ref([]);

getStatistics1().then((res) => {
  panels.value = res.panels;
});
</script>
<style scoped>
.home {
  @apply py-3;
}

/* 骨架屏容器 */
.skeleton-container {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 统计卡片样式优化 */
.stats-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.pay-title,
.subnum {
  @apply flex items-center justify-between text-sm;
}

.title-text {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.num {
  @apply text-3xl font-bold text-gray-500;
  padding: 12px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subnum {
  @apply flex items-center justify-between;
  padding: 8px 0;
}

.sub-title {
  color: #909399;
  font-size: 12px;
}

.sub-value {
  color: #409eff;
  font-weight: 600;
  font-size: 13px;
}

:deep(.el-card__header) {
  @apply py-2 bg-gray-50;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-divider) {
  margin: 8px 0;
}
</style>
