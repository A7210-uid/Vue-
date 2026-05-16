<script setup>
import { reactive, watch, defineProps, onMounted } from "vue";
import gsap from "gsap";

//接受父组件传递value值
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  // 动画持续时间（秒）
  duration: {
    type: Number,
    default: 1.5,
  },
  // 小数位数
  decimals: {
    type: Number,
    default: 0,
  },
});

//中间动画数据
const d = reactive({
  num: 0,
});

const AnimateToValue = () => {
  gsap.to(d, {
    num: props.value,
    duration: props.duration,
    ease: "power2.out", // 缓动效果：开始快，结束慢
    onUpdate: () => {
      // 可以在这里添加更新回调
    },
  });
};

//组件挂载后执行动画
onMounted(() => {
  // 延迟一点时间执行，让页面先渲染
  setTimeout(() => {
    AnimateToValue();
  }, 100);
});

//监听value变化
watch(
  () => props.value,
  (newVal, oldVal) => {
    // 只有当值真正改变时才执行动画
    if (newVal !== oldVal) {
      AnimateToValue();
    }
  }
);
</script>

<template>
  <span class="count-to-number">
    {{ d.num.toFixed(decimals) }}
  </span>
</template>

<style scoped>
.count-to-number {
  display: inline-block;
  font-variant-numeric: tabular-nums; /* 等宽数字，防止抖动 */
}
</style>
