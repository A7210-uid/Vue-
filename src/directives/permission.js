/**
 * v-permission 自定义指令
 * 用于按钮级别的权限控制
 * 
 * 使用方法：
 * <el-button v-permission="'user:add'">新增用户</el-button>
 * <el-button v-permission="['user:add', 'user:edit']">操作按钮</el-button>
 * 
 * 原理说明：
 * 1. 从用户信息中获取权限列表
 * 2. 比对当前元素需要的权限
 * 3. 如果没有权限，则移除该DOM元素
 */

import { useUserStore } from "~/store";

export const permission = {
  // 指令挂载时执行
  mounted(el, binding) {
    checkPermission(el, binding);
  },
  
  // 指令所在组件更新时执行
  updated(el, binding) {
    checkPermission(el, binding);
  }
};

/**
 * 检查权限的核心函数
 * @param {HTMLElement} el - 指令绑定的DOM元素
 * @param {Object} binding - 指令的绑定信息
 */
function checkPermission(el, binding) {
  // 获取store实例
  const store = useUserStore();
  
  // 获取用户的权限列表
  const userPermissions = store.user.permissions || [];
  
  // 获取指令传入的权限值（支持字符串或数组）
  const requiredPermission = binding.value;
  
  // 如果没有传入权限值，抛出警告
  if (!requiredPermission) {
    throw new Error("需要提供权限标识！例如：v-permission=\"'user:add'\"");
  }
  
  // 判断是否有权限
  const hasPermission = checkUserPermission(userPermissions, requiredPermission);
  
  // 如果没有权限，移除该元素
  if (!hasPermission && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

/**
 * 检查用户是否拥有所需权限
 * @param {Array} userPermissions - 用户的权限列表
 * @param {String|Array} requiredPermission - 需要的权限
 * @returns {Boolean} - 是否有权限
 */
function checkUserPermission(userPermissions, requiredPermission) {
  // 如果是超级管理员，拥有所有权限
  if (userPermissions.includes("*")) {
    return true;
  }
  
  // 如果requiredPermission是数组，表示满足其中一个权限即可
  if (Array.isArray(requiredPermission)) {
    return requiredPermission.some(permission => 
      userPermissions.includes(permission)
    );
  }
  
  // 如果是字符串，直接检查
  return userPermissions.includes(requiredPermission);
}
