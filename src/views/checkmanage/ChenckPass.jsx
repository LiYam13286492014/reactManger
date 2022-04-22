import { Table ,Button, } from 'antd'
import {CloseCircleOutlined,CheckCircleOutlined} from '@ant-design/icons';
import axios from 'axios';
import React from 'react'
import { useEffect,useState} from 'react';




export default function CheckPass() {
    const[dataSource,setDataSource]=useState([])
    const {rolesId,username,region} = JSON.parse(localStorage.getItem('tt'))

    useEffect(()=>{
        const obj={
            "1":"superadmin",
            "2":'admin',
            "3":'editor'
        }
        axios.get(`http://localhost:3001/news?auditState=1&_expand=categories`)
        .then(res=>{
            const list = res.data
            setDataSource(obj[rolesId]==='superadmin'?list:[
                ...list.filter(data=>data.author===username),
                ...list.filter(data=>data.region===region &&obj[data.rolesId]==='editor')
            ])
        })
    },[rolesId,username,region])

 
    const columns = [
        {
          title: '新闻标题',
          dataIndex: 'title',
          render:(title,item)=>{
              return <a href={`http://localhost:3000/news-manage/preview/${item.id}`}>{title}</a>
          }
        

        },
        {
          title: '分类',
          dataIndex: 'categories',
          render:(categories)=>{
              return categories.title
          }
          
        },
        {
          title: '作者',
          dataIndex: 'author',

          
        },



        {
            title:'操作',
            render:(item)=>{
                return <div >
                    <Button onClick={()=>handleClose(item)} danger shape='circle' icon={<CloseCircleOutlined />}   ></Button>
                                                                                   
                    <Button onClick={()=>handlePass(item)} type='primary' shape='circle' icon={<CheckCircleOutlined />}  ></Button>
                    
                </div>
            }
        }
      ];

      const handlePass =(item)=>{
          axios.patch(`http://localhost:3001/news/${item.id}`,{
              auditState: 2,
              publishState:1
          }).then(res=>{
              setDataSource(dataSource.filter(data=>data.id!==item.id))
              console.log(dataSource.filter(data=>data.id!==item.id));
          })
      }
      const handleClose =(item)=>{
        axios.patch(`http://localhost:3001/news/${item.id}`,{
            auditState: 3,
            publishState: 0
        }).then(res=>{
            setDataSource(dataSource.filter(data=>data.id!==item.id))
            
        })
    }
  return (
    <div> 
        <Table dataSource={dataSource} columns={columns} 
                pagination={{pageSize:5}}
                rowKey={(item)=>item.id}
        />
    </div>
  )
}
