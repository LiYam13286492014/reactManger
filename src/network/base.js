import axios from "axios";


export function baseRequest(){
    
     axios.create({
        baseURL:'http://localhost:3001'
    })

    

    
}