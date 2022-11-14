import request from '@/utils/request'
import { removeToken } from '@/utils/auth'

// 验证码接口
export function captcha(datas) {
  return request({
    url: '/api/captcha',
    method: 'post',
    data: datas
  })
}

// 请求出错处理
export function requesterr(thiss, err) {
    // console.log(err.toJSON());
    // console.log(err);
    
    //console.log(err.toJSON());
    if (err.response) {
        thiss.$message({ showClose: true, message: err.response.data.err, type: 'error' });
    } else if (err.request) {
        thiss.$message({ showClose: true, message: err.message, type: 'error' });
    } else {
        thiss.$message({ showClose: true, message: err.message, type: 'error' });
    }
    if (err.response && err.response.status == 401) {
        removeToken()
        thiss.$router.push(`/login?redirect=${thiss.$route.fullPath}`)

    }
}
// 系统配置接口
export function configMain() {
    return request({
        url: '/api/config',
        method: 'get'
    })
}

// 登入接口
export function login(datas) {
    return request({
        url: '/api/login',
        method: 'post',
        data: datas
    })
}

// 获取目录和文件数据
export function mirlist(datas) {
    return request({
        url: '/api/ls',
        method: 'post',
        data: datas
    })
}

// 创建目录
export function mkdir(datas) {
    return request({
        url: '/api/mkdir',
        method: 'post',
        data: datas
    })
}

// 上传文件
export function uploadrequest(datas, Progress) {
    return request({
        url: '/api/uploadbase64',
        method: 'post',
        data: datas,
        onUploadProgress: Progress

    })
}

// 删除目录
export function rmdirs(datas) {
    return request({
        url: '/api/rmdir',
        method: 'post',
        data: datas
    })
}

// 删除文件
export function deletefile(datas) {
    return request({
        url: '/api/delete',
        method: 'post',
        data: datas
    })
}

// 重命名文件
export function renamefile(datas) {
    return request({
        url: '/api/rename',
        method: 'post',
        data: datas
    })
}

// 移动目录
export function movefiledir(datas) {
    return request({
        url: '/api/move',
        method: 'post',
        data: datas
    })
}

// 更换皮肤
export function switchthemeApi(datas) {
    return request({
        url: '/api/switchtheme/',
        method: 'post',
        data: datas
    })
}