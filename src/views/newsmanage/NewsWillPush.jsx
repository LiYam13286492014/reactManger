import React from 'react'
import { Table ,Button,  Tag,Modal,message,notification} from 'antd'
import {EditOutlined,DeleteOutlined,ExclamationCircleOutlined ,UploadOutlined} from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




export default function NewsWillPush() {
    const navigate=useNavigate()
    const{username} = JSON.parse(localStorage.getItem('tt'))
    useEffect(()=>{
        axios.get(`http://localhost:3001/news?author=${username}&auditState=0&_expand=categories`)
        .then(res=>{
            setDraftData(res.data)
            console.log(res.data);
            console.log(username);
        })
    },[])
    const[draftData,setDraftData] =useState([])
    const { confirm } = Modal;
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
          render:(author)=>{
              return <Tag color="orange">{author}</Tag>
          }
          
        },


        {
            title:'操作',
            render:(item)=>{
                return <div >
                    <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>confirmMethod(item) } ></Button>
                                                                                   
                    <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={()=>handleUpdate(item)} ></Button>
                    <Button type='primary' shape='circle' icon={<UploadOutlined />} onClick={()=>handleCheck(item)} ></Button>
                </div>
            }
        }
      ];
      const confirmMethod=(item)=>{
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
              deleteItem(item)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

    const deleteItem=(item)=>{
        console.log(item);
        
            let list = draftData.filter(data => data.id !== item.id)
            
            setDraftData([...list])

            axios.delete(`http://localhost:3001/news/${item.id}`)
        
        
    }

    const handleUpdate =(item)=>{
        navigate(`/news-manage/update/${item.id}`)
    }

    const handleCheck=(item)=>{
        axios.patch(`http://localhost:3001/news/${item.id}`,{
            auditState: 1
        }).then((res)=>{
            setDraftData(draftData.filter(data=>data.id !== item.id))
            // navigate(res.data.auditState===0?'/news-manage/willpush':'/check-manage/List')
            notification.info({
                message: "通知:",
                description:
                  `已进入${res.data.auditState===0?'草稿箱':'审核列表'}`,
                placement:'bottomRight'
              });
        })
    }
  return (
    <div>
        <Table dataSource={draftData} columns={columns} 
            pagination={{pageSize:5}}
            rowKey={(item)=>item.id}
        />
    </div>
  )
}
