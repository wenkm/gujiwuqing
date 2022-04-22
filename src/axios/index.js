/*
* @Author: Kevin
* @Date: 2022-04-22 13:22:12
* @Description: axios配置
*/
import axios from 'axios';
const preUrl = 'iGBcoiAtc3s_yCLMrlOGF'
const instance = axios.create({
    baseURL: '',
});

instance.interceptors.request.use(request => {
    const config = request;
    config.url = request.url.replace('_next/data', `_next/data/${preUrl}`);
    return config;
});
instance.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data;
    } else {
        return Promise.reject(response.data);
    }
}, err => {
    const error = err + '';
    let res = {
        code: 500,
        message: '服务器错误'
    };
    if(error.includes('timeout')) {
        res = {
            code: 504,
            message: '访问超时'
        }
    }
    if(error.includes('status code')) {
        const code = +error.split('status code ')[1];
        res.code = code;
        switch(code) {
            case 403:
                res.message = '没有权限';
                break;
            case 404:
                res.message = '资源不存在';
                break;
            case 405:
                res.message = '不支持该请求';
                break;
            case 503:
                res.message = '服务不可用';
                break;
            case 504:
                res.message = '访问超时';
        }
    }
    return Promise.reject(res);
});

export default instance;