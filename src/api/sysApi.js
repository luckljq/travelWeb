import request from '../utils/request';
/**
 * description：sys接口
 *
 * @author ljq
 * @date 2019/12/24　11:16
 */
//删除角色
export const deleteRole = (id) => {
    return request({
        url: '/sys/role/' + id,
        method: 'delete'
    })
};

//修改角色
export const updateRole = (query) => {
    return request({
        url: '/sys/role',
        method: 'put',
        data: query
    })
};

//分配权限
export const distributePrivilege = (query) => {
    return request({
        url:'/sys/rolePrivileges',
        method: 'post',
        data: query
    })
};

//获取权限列表
export const getPrivileges = () => {
    return request({
        url:'/sys/privileges',
        method:'get'
    })
};

//增加角色
export const addRole =(query) => {
    return request({
        url: '/sys/role',
        method: 'post',
        data: query
    })
};

//获取用户角色列表
export const getRoles = (query) =>{
  return request({
      url: '/sys/roles',
      method: 'get',
      params: query
  })
};

//分配角色
export const distributeRole = (query) => {
    return request({
        url:'/sys/distributeRole',
        method:'post',
        data:query
    })
};

//获取用角色列表（简单信息）
export const getRoleList = () =>{
    return request({
        url:'/sys/roles/list',
        method: 'get'
    })
};

//修改用户
export const editUser = (query) => {
    return request({
        url: '/sys/user',
        method: 'put',
        data: query
    })
};

//获取地区列表
export const getLocationsList =() => {
    return request({
        url: '/sys/locations',
        method: 'get'
    })
};

//获取地区列表
export const getLocations = (id) => {
    return request({
        url: '/sys/location/'+id,
        method: 'get'
    })
};

//获取用户列表
export const getUsers = (query) => {
    return request({
        url: '/sys/users',
        method: 'get',
        params: query
    })
};

export const deleteUser = (id) => {
    return request({
        url: '/sys/user/'+id,
        method: 'delete'
    })
};

//启用、禁用
export const editEnable = (query) => {
    return request({
        url: '/sys/user/enable',
        method: 'patch',
        data: query
    })
};
