import axios from 'axios';

import { useEffect,useState} from 'react';


export function usePublish(type){
    const[dataSource,setDataSource]=useState([])
    const{username} = JSON.parse(localStorage.getItem('tt'))
    
    useEffect(()=>{
        axios.get(`http://localhost:3001/news/?author=${username}&publishState=${type}&_expand=categories`)
        .then(res=>{
            setDataSource(res.data)
        })
    },[username,type])

    const handlePush=(id)=>{
        console.log(id);
        axios.patch(`http://localhost:3001/news/${id}`,{
            publishState:2,
            publishTime:Date.now()
        }).then((res)=>{
            
            setDataSource(dataSource.filter(item=>item.id!==id))
        })
    }

    const handleOut =(id)=>{
        console.log(id);
        axios.patch(`http://localhost:3001/news/${id}`,{
            publishState:3,
            
        }).then((res)=>{
            
            setDataSource(dataSource.filter(item=>item.id!==id))
        })
    }

    const handleDelete=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:3001/news/${id}`).then((res)=>{
            
            setDataSource(dataSource.filter(item=>item.id!==id))
        })
    }


    return {
        dataSource,
        handlePush,
        handleOut,
        handleDelete
    }
}