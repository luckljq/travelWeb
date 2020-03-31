import request from '../utils/request';

//获取游记列表
export const getDiaries = (query) => {
    return request({
        url:'/active/web/diaries',
        method:'get',
        params: query
    })
};

//新增游记
export const addDiary = (query) => {
    return request({
        url: '/active/user/diary',
        method:'post',
        data: query
    })
};
