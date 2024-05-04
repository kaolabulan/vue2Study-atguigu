import axios from "axios";
//引入进度条progress
import progress from "nprogress"
import "nprogress/nprogress.css"


//创建axios并配置
const mockAxios = axios.create({
    baseURL:"/mock",
    timeout:5000,
})
//请求拦截器
mockAxios.interceptors.request.use((config)=>{
    progress.start()
    return config
},(error)=>{
    return Promise.reject(error)
})
//响应拦截器
mockAxios.interceptors.response.use((response)=>{
    progress.done()
    return response.data
},(error)=>{
    return Promise.reject(error)
})
export default mockAxios











