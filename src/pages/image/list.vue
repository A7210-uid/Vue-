<template>
  <div class="gallery-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>

    <!-- 错误提示 -->
    <div v-if="errorMsg" class="error-tip">{{ errorMsg }}</div>

    <!-- 分类列表（如果有） -->
    <div class="category-list" v-if="categoryList.length > 0">
      <div v-for="item in categoryList" :key="item.id">{{ item.name }}</div>
    </div>

    <!-- 图片列表 -->
    <div class="image-list">
      <div v-for="img in imageList" :key="img.id" class="image-item">
        <img :src="img.url" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 引入你的接口（路径不对自己改）
import { getImageList } from '@/api/image'
import { getCategoryList } from '@/api/category'

// 数据定义
const imageList = ref([])     // 图片列表
const categoryList = ref([])   // 分类列表
const loading = ref(false)    // 加载状态
const errorMsg = ref('')      // 错误信息

// ==========================================
// 【安全版】获取图片列表
// ==========================================
const fetchImageList = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const res = await getImageList({
      page: 1,
      size: 50
    })

    // ✅ 关键：防御性判断，防止 undefined.data 报错
    if (res && res.data) {
      imageList.value = res.data.list || res.data || []
    } else {
      imageList.value = []
      errorMsg.value = '图片列表为空'
      ElMessage.warning('接口返回数据为空')
    }
  } catch (err) {
    console.error('获取图片列表失败：', err)
    imageList.value = []
    errorMsg.value = '获取图片列表失败，请稍后重试'
    ElMessage.error('获取图片列表失败')
  } finally {
    loading.value = false
  }
}

// ==========================================
// 【安全版】获取分类列表（解决你截图里的报错）
// ==========================================
const fetchCategoryList = async () => {
  try {
    const res = await getCategoryList()

    // ✅ 防御性判断
    if (res && res.data) {
      categoryList.value = res.data.list || res.data || []
    } else {
      categoryList.value = []
      ElMessage.warning('分类数据为空')
    }
  } catch (err) {
    console.error('获取分类失败：', err)
    categoryList.value = []
  }
}

// 页面加载时执行
onMounted(() => {
  fetchCategoryList() // 先加载分类
  fetchImageList()    // 再加载图片
})
</script>

<style scoped>
.gallery-page { padding: 20px; }
.loading { color: #666; margin: 20px 0; }
.error-tip { color: red; margin: 10px 0; }
.image-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.image-item { width: 150px; height: 150px; }
.image-item img { width: 100%; height: 100%; object-fit: cover; }
</style>