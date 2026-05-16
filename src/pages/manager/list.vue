<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { 
  getManagerList, 
  addManager, 
  updateManager, 
  deleteManager,
  getRoleList,
  assignManagerRole
} from "~/api";
import { useUserStore } from "~/store";

const store = useUserStore();

// 表格数据
const tableData = ref([]);
const loading = ref(false);
const total = ref(0);

// 查询参数
const queryParams = reactive({
  page: 1,
  pageSize: 10,
  username: ""
});

// 对话框
const dialogVisible = ref(false);
const dialogTitle = ref("");
const formRef = ref(null);
const formData = reactive({
  id: null,
  username: "",
  password: "",
  email: "",
  phone: "",
  roleIds: []
});

// 表单验证规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" }
  ],
  email: [
    { type: "email", message: "请输入有效的邮箱地址", trigger: "blur" }
  ]
};

// 角色列表
const roleList = ref([]);

// 获取管理员列表
const getManagerListData = async () => {
  loading.value = true;
  try {
    const res = await getManagerList(queryParams);
    tableData.value = res.list;
    total.value = res.total;
  } catch (error) {
    ElMessage.error("获取管理员列表失败");
  } finally {
    loading.value = false;
  }
};

// 获取角色列表
const getRoleListData = async () => {
  try {
    const res = await getRoleList({ page: 1, pageSize: 100 });
    roleList.value = res.list;
  } catch (error) {
    console.error("获取角色列表失败", error);
  }
};

// 新增按钮
const handleAdd = () => {
  dialogTitle.value = "新增管理员";
  resetForm();
  dialogVisible.value = true;
};

// 编辑按钮
const handleEdit = (row) => {
  dialogTitle.value = "编辑管理员";
  Object.assign(formData, row);
  dialogVisible.value = true;
};

// 删除按钮
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除管理员 "${row.username}" 吗？`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    );
    
    await deleteManager(row.id);
    ElMessage.success("删除成功");
    getManagerListData();
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (formData.id) {
          await updateManager(formData.id, formData);
          ElMessage.success("更新成功");
        } else {
          await addManager(formData);
          ElMessage.success("添加成功");
        }
        dialogVisible.value = false;
        getManagerListData();
      } catch (error) {
        ElMessage.error("操作失败");
      }
    }
  });
};

// 重置表单
const resetForm = () => {
  formData.id = null;
  formData.username = "";
  formData.password = "";
  formData.email = "";
  formData.phone = "";
  formData.roleIds = [];
};

// 搜索
const handleSearch = () => {
  queryParams.page = 1;
  getManagerListData();
};

// 重置搜索
const handleReset = () => {
  queryParams.username = "";
  queryParams.page = 1;
  getManagerListData();
};

// 页码变化
const handlePageChange = (page) => {
  queryParams.page = page;
  getManagerListData();
};

// 查看用户权限信息
const checkPermission = () => {
  console.log("当前用户信息:", store.user);
  console.log("当前用户权限:", store.user.permissions);
  ElMessage.info(`当前用户权限: ${JSON.stringify(store.user.permissions || [])}`);
};

onMounted(() => {
  getManagerListData();
  getRoleListData();
});
</script>

<template>
  <div class="manager-list p-4">
    <!-- 页面标题 -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-bold">管理员管理</h2>
      <el-button type="info" size="small" @click="checkPermission">
        查看我的权限
      </el-button>
    </div>

    <!-- 搜索栏 -->
    <el-card class="mb-4">
      <el-form :model="queryParams" inline>
        <el-form-item label="用户名">
          <el-input
            v-model="queryParams.username"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <!-- v-permission 指令示例：只有拥有 'manager:search' 权限的用户才能看到搜索按钮 -->
          <el-button 
            v-permission="'manager:search'" 
            type="primary" 
            @click="handleSearch"
          >
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          
          <!-- 支持数组形式：满足其中一个权限即可显示 -->
          <el-button 
            v-permission="['manager:reset', 'manager:search']" 
            @click="handleReset"
          >
            <el-icon><RefreshRight /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮区 -->
    <el-card class="mb-4">
      <div class="flex gap-2">
        <!-- 只有拥有 'manager:add' 权限的用户才能看到新增按钮 -->
        <el-button v-permission="'manager:add'" type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增管理员
        </el-button>
        
        <!-- 只有拥有 'manager:export' 权限的用户才能看到导出按钮 -->
        <el-button v-permission="'manager:export'" type="success">
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
        
        <!-- 只有拥有 'manager:batchDelete' 权限的用户才能看到批量删除按钮 -->
        <el-button v-permission="'manager:batchDelete'" type="danger">
          <el-icon><Delete /></el-icon>
          批量删除
        </el-button>
      </div>
    </el-card>

    <!-- 数据表格 -->
    <el-card>
      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="phone" label="手机号" width="150" />
        <el-table-column prop="roles" label="角色" width="200">
          <template #default="{ row }">
            <el-tag 
              v-for="role in row.roles" 
              :key="role.id" 
              size="small" 
              class="mr-1"
            >
              {{ role.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <!-- 编辑按钮：需要 'manager:edit' 权限 -->
            <el-button 
              v-permission="'manager:edit'" 
              type="primary" 
              size="small" 
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            
            <!-- 分配角色按钮：需要 'manager:assignRole' 权限 -->
            <el-button 
              v-permission="'manager:assignRole'" 
              type="success" 
              size="small"
            >
              分配角色
            </el-button>
            
            <!-- 删除按钮：需要 'manager:delete' 权限 -->
            <el-button 
              v-permission="'manager:delete'" 
              type="danger" 
              size="small" 
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="queryParams.page"
          :page-size="queryParams.pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!formData.id">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select
            v-model="formData.roleIds"
            multiple
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="role in roleList"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.manager-list {
  background: #f5f7fa;
  min-height: 100%;
}
</style>
