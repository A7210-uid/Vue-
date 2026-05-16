<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";

const tableData = ref([
  { id: 1, username: "张三", email: "zhangsan@example.com", level: "VIP1", status: 1 },
  { id: 2, username: "李四", email: "lisi@example.com", level: "VIP2", status: 1 },
  { id: 3, username: "王五", email: "wangwu@example.com", level: "VIP3", status: 0 },
]);

const handleEdit = (row) => {
  ElMessage.info(`编辑用户：${row.username}`);
};

const handleDelete = (row) => {
  ElMessage.info(`删除用户：${row.username}`);
};
</script>

<template>
  <div class="user-list p-4">
    <h2 class="text-xl font-bold mb-4">用户列表</h2>

    <el-card>
      <!-- 操作按钮：使用 v-permission 控制权限 -->
      <div class="mb-4">
        <el-button v-permission="'user:add'" type="primary">
          <el-icon><Plus /></el-icon>
          新增用户
        </el-button>
        <el-button v-permission="'user:export'" type="success">
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="level" label="会员等级" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? "启用" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button 
              v-permission="'user:edit'" 
              type="primary" 
              size="small" 
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button 
              v-permission="'user:delete'" 
              type="danger" 
              size="small" 
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.user-list {
  background: #f5f7fa;
  min-height: 100%;
}
</style>
