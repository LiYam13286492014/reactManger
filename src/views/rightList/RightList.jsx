import React, { useState } from 'react'
import { Button, Table, Tag,Modal, Switch,Popover } from 'antd'
import {EditOutlined,DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getRight } from '../../network/right';
import axios from 'axios';


export default function RightList() {
    useEffect(()=>{
        getRight().then(res =>{
            const list=res
            list[0].children=""
            setDataSource(res)
        })

       
    },[])

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
        if(item.ccId){
            let list = dataSource.filter(data => data.id === item.ccId)
            list[0].children = list[0].children.filter(data=> data.id !== item.id)
            setDataSource([...dataSource])

            axios.delete(`http://localhost:3001/children/${item.id}`)
        }else{
            setDataSource(dataSource.filter(data=>data.id !== item.id))
            axios.delete(`http://localhost:3001/cc/${item.id}`)
        }
        
    }

    const changePage= (item)=>{
        item.pagepermission= item.pagepermission ===1?0:1

        setDataSource([...dataSource])
        if(item.ccId){
            axios.patch(`http://localhost:3001/children/${item.id}`,{
                pagepermission: item.pagepermission
                
            })
        }else{
            axios.patch(`http://localhost:3001/cc/${item.id}`,{
                pagepermission: item.pagepermission
            })
        }
    }

    const[dataSource,setDataSource] =useState([])
    const { confirm } = Modal;

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          render:(id)=>{
              return <b>{id}</b>
          }
          
        },
        {
          title: '权限名称',
          dataIndex: 'title',
          
        },
        {
          title: '权限路径',
          dataIndex: 'key',
          render:(key)=>{
              return <Tag color="orange">{key}</Tag>
          }
          
        },
        {
            title:'操作',
            render:(item)=>{
                return <div>
                    <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}></Button>
                    
                    <Popover content={<div style={{textAlign:'center'}}>
                        <Switch checked={item.pagepermission} onChange={()=>changePage(item)}></Switch>
                    </div>} title="配置项" trigger={item.pagepermission === undefined? '': 'click'}>
                    <Button type='primary' shape='circle' icon={<EditOutlined />} disabled={item.pagepermission === undefined}></Button>
                    </Popover>
                </div>
            }
        }
      ];
  return (
    <div><Table dataSource={dataSource} columns={columns} 
    pagination={{
        pageSize:5
    } } rowKey={item=>item.id}/></div>
    
  )
}
