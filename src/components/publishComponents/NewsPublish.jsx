import { Table ,Button,  Tag} from 'antd'
import {EditOutlined,DeleteOutlined ,UploadOutlined} from '@ant-design/icons';
import axios from 'axios';
import React from 'react'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';




export default function NewsPublish(props) {
    // const[dataSource,setDataSource]=useState([])
    // const{username} = JSON.parse(localStorage.getItem('tt'))
    // const navigate = useNavigate()
    // useEffect(()=>{
    //     axios.get(`http://localhost:3001/news/?author=${username}&auditState_ne=0&publishState_lte=1&_expand=categories`)
    //     .then(res=>{
    //         setDataSource(res.data)
    //     })
    // },[])
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
                    {props.button(item.id)}                                                                                   
                    
                </div>
            }
        }
      ];
     
  return (
    <div> 
        <Table dataSource={props.dataSource} columns={columns} 
                pagination={{pageSize:5}}
                rowKey={(item)=>item.id}
        />
    </div>
  )
}
