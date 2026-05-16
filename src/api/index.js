import axios from "~/axios";

// 获取首页统计数据
export const getStatistics1 = () => {
  return axios.get("admin/statistics1");
};

// ==================== 权限管理相关API ====================

/**
 * 获取权限列表
 * @param {Object} params - 查询参数
 * @returns {Promise} 权限列表
 */
export const getAccessList = (params) => {
  return axios.get("admin/access/list", { params });
};

/**
 * 获取权限详情
 * @param {Number} id - 权限ID
 * @returns {Promise} 权限详情
 */
export const getAccessDetail = (id) => {
  return axios.get(`admin/access/detail/${id}`);
};

/**
 * 添加权限
 * @param {Object} data - 权限数据
 * @returns {Promise} 添加结果
 */
export const addAccess = (data) => {
  return axios.post("admin/access/add", data);
};

/**
 * 更新权限
 * @param {Number} id - 权限ID
 * @param {Object} data - 更新的权限数据
 * @returns {Promise} 更新结果
 */
export const updateAccess = (id, data) => {
  return axios.post(`admin/access/update/${id}`, data);
};

/**
 * 删除权限
 * @param {Number} id - 权限ID
 * @returns {Promise} 删除结果
 */
export const deleteAccess = (id) => {
  return axios.post(`admin/access/delete/${id}`);
};

// ==================== 角色管理相关API ====================

/**
 * 获取角色列表
 * @param {Object} params - 查询参数
 * @returns {Promise} 角色列表
 */
export const getRoleList = (params) => {
  return axios.get("admin/role/list", { params });
};

/**
 * 获取角色详情
 * @param {Number} id - 角色ID
 * @returns {Promise} 角色详情
 */
export const getRoleDetail = (id) => {
  return axios.get(`admin/role/detail/${id}`);
};

/**
 * 添加角色
 * @param {Object} data - 角色数据
 * @returns {Promise} 添加结果
 */
export const addRole = (data) => {
  return axios.post("admin/role/add", data);
};

/**
 * 更新角色
 * @param {Number} id - 角色ID
 * @param {Object} data - 更新的角色数据
 * @returns {Promise} 更新结果
 */
export const updateRole = (id, data) => {
  return axios.post(`admin/role/update/${id}`, data);
};

/**
 * 删除角色
 * @param {Number} id - 角色ID
 * @returns {Promise} 删除结果
 */
export const deleteRole = (id) => {
  return axios.post(`admin/role/delete/${id}`);
};

/**
 * 为角色分配权限
 * @param {Number} roleId - 角色ID
 * @param {Array} accessIds - 权限ID数组
 * @returns {Promise} 分配结果
 */
export const assignRoleAccess = (roleId, accessIds) => {
  return axios.post(`admin/role/assign/${roleId}`, { accessIds });
};

/**
 * 获取角色的权限列表
 * @param {Number} roleId - 角色ID
 * @returns {Promise} 角色的权限列表
 */
export const getRoleAccess = (roleId) => {
  return axios.get(`admin/role/access/${roleId}`);
};

// ==================== 管理员管理相关API ====================

/**
 * 获取管理员列表
 * @param {Object} params - 查询参数
 * @returns {Promise} 管理员列表
 */
export const getManagerList = (params) => {
  return axios.get("admin/manager/list", { params });
};

/**
 * 添加管理员
 * @param {Object} data - 管理员数据
 * @returns {Promise} 添加结果
 */
export const addManager = (data) => {
  return axios.post("admin/manager/add", data);
};

/**
 * 更新管理员
 * @param {Number} id - 管理员ID
 * @param {Object} data - 更新的管理员数据
 * @returns {Promise} 更新结果
 */
export const updateManager = (id, data) => {
  return axios.post(`admin/manager/update/${id}`, data);
};

/**
 * 删除管理员
 * @param {Number} id - 管理员ID
 * @returns {Promise} 删除结果
 */
export const deleteManager = (id) => {
  return axios.post(`admin/manager/delete/${id}`);
};

/**
 * 为管理员分配角色
 * @param {Number} managerId - 管理员ID
 * @param {Array} roleIds - 角色ID数组
 * @returns {Promise} 分配结果
 */
export const assignManagerRole = (managerId, roleIds) => {
  return axios.post(`admin/manager/assign/${managerId}`, { roleIds });
};

// ==================== 图库管理相关API ====================

/**
 * 获取图片分类列表
 * @returns {Promise} 分类列表
 */
export const getImageCategories = () => {
  return axios.get("admin/image/categories");
};

/**
 * 添加图片分类
 * @param {Object} data - 分类数据
 * @returns {Promise} 添加结果
 */
export const addImageCategory = (data) => {
  return axios.post("admin/image/category/add", data);
};

/**
 * 更新图片分类
 * @param {Number} id - 分类ID
 * @param {Object} data - 更新的分类数据
 * @returns {Promise} 更新结果
 */
export const updateImageCategory = (id, data) => {
  return axios.post(`admin/image/category/update/${id}`, data);
};

/**
 * 删除图片分类
 * @param {Number} id - 分类ID
 * @returns {Promise} 删除结果
 */
export const deleteImageCategory = (id) => {
  return axios.post(`admin/image/category/delete/${id}`);
};

/**
 * 获取图片列表
 * @param {Object} params - 查询参数
 * @returns {Promise} 图片列表
 */
export const getImageList = (params) => {
  return axios.get("admin/image/list", { params });
};

/**
 * 上传图片（单张）
 * @param {FormData} formData - 包含图片文件的FormData
 * @returns {Promise} 上传结果
 */
export const uploadImage = (formData) => {
  return axios.post("admin/image/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 批量上传图片
 * @param {FormData} formData - 包含多个图片文件的FormData
 * @returns {Promise} 上传结果
 */
export const uploadImages = (formData) => {
  return axios.post("admin/image/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 更新图片信息
 * @param {Number} id - 图片ID
 * @param {Object} data - 更新的图片数据
 * @returns {Promise} 更新结果
 */
export const updateImage = (id, data) => {
  return axios.post(`admin/image/update/${id}`, data);
};

/**
 * 删除图片
 * @param {Number} id - 图片ID
 * @returns {Promise} 删除结果
 */
export const deleteImage = (id) => {
  return axios.post(`admin/image/delete/${id}`);
};

/**
 * 批量删除图片
 * @param {Array} ids - 图片ID数组
 * @returns {Promise} 删除结果
 */
export const batchDeleteImages = (ids) => {
  return axios.post("admin/image/batch-delete", { ids });
};

/**
 * 移动图片到指定分类
 * @param {Number} imageId - 图片ID
 * @param {Number} categoryId - 目标分类ID
 * @returns {Promise} 移动结果
 */
export const moveImage = (imageId, categoryId) => {
  return axios.post(`admin/image/move/${imageId}`, { categoryId });
};
