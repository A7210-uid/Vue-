<script setup>
import { ref, onMounted, watch } from "vue";
import { useECharts } from "~/composables/useECharts";
import * as echarts from "echarts";

// 使用自定义hook
const { initChart, setOption, showLoading, hideLoading } = useECharts();

// 时间选项配置
const options = [
  { text: "近1个月", value: "month" },
  { text: "近1周", value: "week" },
  { text: "近24小时", value: "hour" },
];

// 设置当前标签激活项
const current = ref("week");

// 加载状态
const loading = ref(false);

// 点击标签页改变激活值并更新图表
const handleActive = (v) => {
  current.value = v;
  getData(v);
};

// 根据不同的时间范围获取不同的图表数据
const getData = (timeRange) => {
  loading.value = true;
  showLoading({ text: "加载中..." });
  
  // 模拟不同时间范围的数据
  let chartData = {
    xAxisData: [],
    seriesData: [],
  };

  switch (timeRange) {
    case "month":
      // 近30天数据
      chartData = {
        xAxisData: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
        seriesData: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300) + 50),
      };
      break;
    case "week":
      // 近7天数据
      chartData = {
        xAxisData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        seriesData: [120, 200, 150, 80, 70, 110, 130],
      };
      break;
    case "hour":
      // 近24小时数据
      chartData = {
        xAxisData: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        seriesData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 150) + 20),
      };
      break;
  }

  // 模拟异步请求延迟
  setTimeout(() => {
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: "{b}<br/>{a}: {c} 单",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: chartData.xAxisData,
        axisLine: {
          lineStyle: {
            color: "#E6E6E6",
          },
        },
        axisLabel: {
          color: "#999",
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            color: "#F0F0F0",
            type: "dashed",
          },
        },
        axisLabel: {
          color: "#999",
        },
      },
      series: [
        {
          name: "订单量",
          data: chartData.seriesData,
          type: "bar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          barWidth: "60%",
        },
      ],
    };
    
    setOption(option, true); // true表示不合并，完全替换
    loading.value = false;
    hideLoading();
  }, 300);
};

onMounted(() => {
  const chartDom = document.querySelector("#chart");
  initChart(chartDom);
  getData("week");
});

// 监听current变化
watch(current, (newVal) => {
  getData(newVal);
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <span class="text-sm font-weight-500">订单统计</span>
        <div>
          <el-check-tag
            v-for="item in options"
            class="mr-[8px] cursor-pointer"
            :checked="current == item.value"
            @click="handleActive(item.value)"
          >
            {{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <!-- 图表部分 -->
    <div v-loading="loading" id="chart" class="h-[300px]"></div>
  </el-card>
</template>

<style scoped></style>
