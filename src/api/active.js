import request from '../utils/request';

//新增游记
export const addDiary = (query) => {
    return request({
        url: '/active/user/diary',
        method:'post',
        data: query
    })
};
