import { Table ,Button,  Tag} from 'antd'
import axios from 'axios';
import React from 'react'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';




export default function CheckList() {
    const[dataSource,setDataSource]=useState([])
    const{username} = JSON.parse(localStorage.getItem('tt'))
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:3001/news/?author=${username}&auditState_ne=0&publishState_lte=1&_expand=categories`)
        .then(res=>{
            setDataSource(res.data)
        })
    },[username])
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
            title: '审核状态',
            dataIndex: 'auditState',
            render:(auditState)=>{
                const typeColor = ['','orange','green','red']
                const typeText = ['未审核','待审核','已通过','已驳回',]
                return <Tag color={typeColor[auditState]}>{typeText[auditState]}</Tag>
            }
            
        },


        {
            title:'操作',
            render:(item)=>{
                const buttonText = ['','撤销','发布','修改']
                const buttonType = ['','dashed','primary','']
                return <div >
                    <Button type={buttonType[item.auditState]} shape='' onClick={()=>handlePush(item)}   >{buttonText[item.auditState]}</Button>
                                                                                   
                    
                </div>
            }
        }
      ];
      const handlePush=(item)=>{
        {
              item.auditState===1&&axios.patch(`http://localhost:3001/news/${item.id}`,{
                  auditState:0
              }).then(()=>{
                  setDataSource([...dataSource.filter(data=>data.id !== item.id)])
              })
        }

        {
            item.auditState===2&&axios.patch(`http://localhost:3001/news/${item.id}`,{
                publishState:2,
                publishTime:Date.now()
            }).then(()=>{
                setDataSource([...dataSource.filter(data=>data.id !== item.id)])
            })
        }
        {
            item.auditState===3&&axios.patch(`http://localhost:3001/news/${item.id}`,{
                auditState:0
            }).then(()=>{
                setDataSource([...dataSource.filter(data=>data.id !== item.id)])
                navigate(`/news-manage/update/${item.id}`)
                
            })
        }
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
