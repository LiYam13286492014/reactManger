import React, { useState ,useRef,useEffect} from 'react'
import { Button, Table, Tag,Modal, Switch, } from 'antd'
import {EditOutlined,DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
 
import axios from 'axios';
import UserFrom from '../components/User_From/UserFrom';
// import UpdateFrom from '../components/User_From/UpdateForm';





export default function UserList() {


    useEffect(()=>{
        const {rolesId,username,region} = JSON.parse(localStorage.getItem('tt'))
        const obj={
            "1":"superadmin",
            "2":'admin',
            "3":'editor'
        }
        axios.get('http://localhost:3001/user?_expand=roles').then(res =>{
            const list = res.data
            setDataSource(obj[rolesId] === "superadmin"?list:[
                ...list.filter(item => item.username === username),
                ...list.filter(item =>item.region===region && obj[item.rolesId]==='editor')
            ])
            console.log(res.data);
        })

       
    },[])

    useEffect(()=>{
        axios.get('http://localhost:3001/region').then(res =>{
            
            setRegionList(res.data)
            console.log(res.data);
        })

       
    },[])

    
    useEffect(()=>{
        axios.get('http://localhost:3001/roles').then(res =>{
            
            setRoleList(res.data)
            console.log(res.data);
        })

       
    },[])
    const addForm = useRef(null)
    const updateForm= useRef(null)

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
     let list =   dataSource.filter(data =>data.id!==item.id)
     console.log(list);
     setDataSource(list)
     axios.delete(`http://localhost:3001/user/${item.id}`)
        
        
    }

    

    const handleCancel = () => {
        setIsVisible(false);
      };
    const handleOk = ()=>{
        setIsVisible(false)
        
        console.log(addForm);
       addForm.current.validateFields().then(value =>{
           console.log(value);

           axios.post('http://localhost:3001/user',{
                ...value,
                "default":false,
                "rolestate":true
           }).then(() =>{
               axios.get('http://localhost:3001/user?_expand=roles').then(res =>{
                setDataSource(res.data)
                console.log(dataSource);
               })
              
           
              
           }).catch(err =>{
               console.log(err);
           })
           addForm.current.resetFields()
       })
       
    }

    const handleChange = (item)=>{
        console.log(item);
        item.rolestate = !item.rolestate
        setDataSource([...dataSource])
        axios.patch(`http://localhost:3001/user/${item.id}`,{
            
           "rolestate": item.rolestate
        })

    }

    const updateOk =()=>{
        setIsUpdateVisible(false)
        updateForm.current.validateFields().then(value=>{
            console.log(value);
            setDataSource(dataSource.map(item =>{
                if(item.id === updateCurrentId){
                    return {...item,...value,roles:roleList.filter(data =>data.id === value.rolesId)[0]}
                    
                }else{
                    return item
                }
            }))
            axios.patch(`http://localhost:3001/user/${updateCurrentId}`,{
                ...value
            })
        })
    }

    const updateCancel= ()=>{
        setIsUpdateVisible(false)
    }

    const handleClick =(item) =>{
        
            console.log(item);
            setTimeout(() => {
                console.log(updateForm);
                setIsUpdateVisible(true)
                
                updateForm.current.setFieldsValue(item)
                
                
            }, 0);
            setUpdateCurrentId(item.id)
            console.log(updateCurrentId);
        
    }

    const[dataSource,setDataSource] =useState([])
    const[isVisible,setIsVisible] =useState(false)
    const[isUpdateVisible,setIsUpdateVisible] =useState(false)
    const[regionList,setRegionList] =useState([])
    const[roleList,setRoleList] =useState([])
    const[updateCurrentId,setUpdateCurrentId] =useState([])
    

    
    const { confirm } = Modal;

    const columns = [
        {
          title: '区域',
          dataIndex: 'region',
          filters:[
            ...regionList.map(item =>({
                text:item.title,
                value:item.value
                
            })),
            {
                text:'全球',
                value:'全球'
            }
                
          ],
          render:(region)=>{
              return <b>{region ===''?'全球':region}</b>
          },
          onFilter:(value,item) =>{
              if(value ==='全球'){
                  return item.region === ''
              }else{
                  return item.region === value
              }
          }
        },
        {
          title: '角色名称',
          dataIndex: 'roles',
          render:(roles)=>{
              return roles.rolename
          }
          
        },
        {
          title: '用户名',
          dataIndex: 'username',
          render:(key)=>{
              return <Tag color="orange">{key}</Tag>
          }
          
        },

        {
            title: '用户状态',
            dataIndex: 'rolestate',
            render: (rolestate,item)=>{
                return <Switch checked={rolestate} disabled={item.default} onChange={()=>handleChange(item)}></Switch>
            }
                        
          },
        {
            title:'操作',
            render:(item)=>{
                return <div >
                    <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>confirmMethod(item) } disabled={item.default}></Button>
                                                                                   
                    <Button type='primary' shape='circle' icon={<EditOutlined />} disabled={item.default} onClick={()=>{handleClick(item) }} ></Button>
                    
                </div>
            }
        }
      ];
  return (
    <div >
        <Button type='primary' onClick={()=>{setIsVisible(!isVisible)}}>添加用户</Button>
        <Modal title="用户添加" visible={isVisible} onOk={(handleOk)} onCancel={handleCancel}>
             <UserFrom ref={addForm} roleList={roleList} regionList={regionList}/>
        </Modal>
        <Modal title="更新用户" visible={isUpdateVisible} onOk={(updateOk)} onCancel={updateCancel}>
             <UserFrom ref={updateForm} roleList={roleList} regionList={regionList} isUpdate={true}/>
        </Modal>
        <Table dataSource={dataSource} columns={columns} 
            pagination={{pageSize:5}}
            rowKey={(item)=>item.id}
        />
    </div>
    
  )
}
