/**
 * useECharts - ECharts 组合式函数
 * 用于简化 ECharts 的初始化和响应式处理
 * 
 * 使用方法：
 * const { chartRef, setOption, resize, dispose } = useECharts();
 */

import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";

export function useECharts() {
  const chartRef = ref(null);
  let chartInstance = null;

  /**
   * 初始化图表
   * @param {HTMLElement} dom - DOM元素
   * @param {Object} theme - 主题配置（可选）
   */
  const initChart = (dom, theme = null) => {
    if (!dom) {
      console.error("图表DOM元素不存在");
      return;
    }
    
    chartInstance = echarts.init(dom, theme);
    chartRef.value = chartInstance;
    
    return chartInstance;
  };

  /**
   * 设置图表配置
   * @param {Object} option - ECharts配置项
   * @param {Boolean} notMerge - 是否不合并（默认false）
   */
  const setOption = (option, notMerge = false) => {
    if (chartInstance) {
      chartInstance.setOption(option, notMerge);
    }
  };

  /**
   * 调整图表大小
   */
  const resize = () => {
    if (chartInstance) {
      chartInstance.resize();
    }
  };

  /**
   * 销毁图表实例
   */
  const dispose = () => {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
      chartRef.value = null;
    }
  };

  /**
   * 显示加载动画
   */
  const showLoading = (options = {}) => {
    if (chartInstance) {
      chartInstance.showLoading("default", options);
    }
  };

  /**
   * 隐藏加载动画
   */
  const hideLoading = () => {
    if (chartInstance) {
      chartInstance.hideLoading();
    }
  };

  /**
   * 清空图表
   */
  const clear = () => {
    if (chartInstance) {
      chartInstance.clear();
    }
  };

  /**
   * 窗口resize事件处理
   */
  const handleResize = () => {
    resize();
  };

  // 组件挂载时监听窗口resize
  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  // 组件卸载前清理
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    dispose();
  });

  return {
    chartRef,
    initChart,
    setOption,
    resize,
    dispose,
    showLoading,
    hideLoading,
    clear
  };
}
