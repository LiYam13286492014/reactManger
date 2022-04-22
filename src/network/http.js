import axios from "axios";
import {store} from '../store/index'

axios.defaults.baseURL="http://localhost:3001/"
axios.interceptors.request.use(request =>{
    store.dispatch({
        type:'chang_load',
        payload:true
    })
    return request
},err =>{
    console.log(err);
})


axios.interceptors.response.use(response =>{
    store.dispatch({
        type:'chang_load',
        payload:false
    })
    return response
},err=>{
    console.log(err);
})

export default axios