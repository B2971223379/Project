import axios from 'axios'
export default function (config) {
    //创建axios实例对象
    // const instance = axios.create({
    //     baseURL: '/api',
        // timeout: 20000,
    // });
    const instance = axios.create({
        baseURL: '/api',
        headers: { 'X-Custom-Header': 'foobar' },
        timeout: 200000,
    });

    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        // if (config.url != '/login') {
        //     let token = sessionStorage.getItem('token');
        //     config.headers.Authorization = token;
        // }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response.data;
    }, function (error) {
        // 对响应错误做点什么

        //判断是否请求超时
        // if (error.code == "ECONNABORTED" && error.message.indexOf('timeout') !== -1) {
        //     console.log('请求超时，可能是网络不好');
        // }

        return Promise.reject(error);
    });
    return instance(config);
}