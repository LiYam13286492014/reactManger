import React from 'react'
import { Button, Table, Modal, Tree } from 'antd'
import {DeleteOutlined,ExclamationCircleOutlined,UnorderedListOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getRight } from '../../network/right';


export default function RoleList() {
    const[dataSource,setDataSource] =useState([])
    const[rightList,setRightList] =useState([])
    const[currentRights,setCurrentRights] =useState([])
    const[rightId,setRightId] =useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/roles').then(res =>{
            console.log(res.data);
            setDataSource(res.data)
        })
    },[])

    useEffect(()=>{
        getRight().then(res =>{
            console.log(res);
            setRightList(res)
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
        
            let list = dataSource.filter(data => data.id !== item.id)
            
            setDataSource([...list])

            // axios.delete(`http://localhost:3001/roles/${item.id}`)
        
        
    }
    const { confirm } = Modal;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (item) => {
    console.log(item);
    setIsModalVisible(true);
    setRightId(item.id)
    setCurrentRights(item.rights)
    console.log(currentRights);
  };

    const handleOk = () => {
    setIsModalVisible(false);
    
    setDataSource(dataSource.map(data =>{
        if(data.id === rightId){
            return {
                ...data,
                rights:currentRights
            }
        }

        return data
    }))

    axios.patch(`http://localhost:3001/roles/${rightId}`,{
        rights: currentRights
    })
    
    
  };

    const handleCancel = () => {
    setIsModalVisible(false);
  };
    const onCheck = (checkKeys)=>{
        console.log(checkKeys);
        setCurrentRights(checkKeys)
        console.log(currentRights);
    }

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          render:(id)=>{
              return <b>{id}</b>
          }
          
        },
        {
          title: '角色名称',
          dataIndex: 'rolename',
          
        },        
        {
            title:'操作',
            render:(item)=>{
                return <div>
                    <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}></Button>
                                   
                                           
                    <Button type='primary' shape='circle' icon={<UnorderedListOutlined />} onClick={()=>showModal(item)}></Button>
                    <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Tree
                        checkable
                        checkedKeys={currentRights}
                        onCheck={onCheck}
                        treeData={rightList}
                    />
                    </Modal>
                    
                </div>
            }
        }
      ];

      
  return (
    <div><Table dataSource={dataSource} columns={columns} 
    pagination={
        {
        pageSize:5
    } }/>
    </div>
  )
}
