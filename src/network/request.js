import axios from "axios";


export function request(config){
    
    const instance = axios.create({
        baseURL:'http://localhost:3001'
    })

    instance.interceptors.request.use(request =>{
        return request
    },err =>{
        console.log(err);
    })


    instance.interceptors.response.use(response =>{
        return response.data
    },err=>{
        console.log(err);
    })

    return instance(config)
}