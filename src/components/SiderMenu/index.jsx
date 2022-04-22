import React from 'react'
import {Layout, Menu}  from 'antd'
import {useNavigate,useLocation} from  'react-router-dom'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';




import {
 
  // UserOutlined,
  // VideoCameraOutlined,
  // UploadOutlined,
} from '@ant-design/icons';

const{Sider} = Layout
const { SubMenu } = Menu




// const menuList= [
//   {
//     key:'/home',
//     title:'首页',
//     icon:<UserOutlined/>,
       
//   },
//   {
//     key:'/user-manger',
//     title:'用户管理',
//     icon:<UserOutlined/>,
//     children:[
//       {
//         key:'/user-manager/list',
//         title:'用户列表',
//         icon:<UserOutlined/>,
//       }
//     ]
       
//   },
//   {
//     key:'/right-manage',
//     title:'权限管理',
//     icon:<UserOutlined/>,
//     children:[
//       {
//         key:'/right-manage/role/list',
//         title:'角色列表',
//         icon:<UserOutlined/>,
//       }
//     ]
       
//   }
// ]

 function SiderMenu(props) {
  useEffect(()=>{
    axios.get('http://localhost:3001/cc?_embed=children').then(res =>{
      console.log(res.data);
      setMenu(res.data)
      console.log(location);
      console.log(openKey);
      console.log(selectKey);
      
    })
  },[])

  // useEffect(()=>{
  //   PubSub.subscribe('aa',(_,data)=>{
  //     console.log(data);
      
  //       setIsCollapsed(data)
  //     console.log(isCollapsed);
      
  //   },)
  // },[])
  const[isCollapsed,setIsCollapsed] = useState(true)
  const[menu,setMenu] = useState([])
  
  const navigate = useNavigate()
  const location = useLocation()
  const selectKey = location.pathname
  const openKey = ["/" + location.pathname.split("/")[1]]
  const {roles:{rights}} = JSON.parse(localStorage.getItem('tt'))
  const pagepermission = (item)=>{
    return  item.pagepermission === 1 && rights.includes(item.key)
  }
  
  const renderMenu=(menu)=>{
    return menu.map(item =>{
      if(item.children?.length>0 && pagepermission(item)){
        return <SubMenu key={item.key} icon={item.icon} title={item.title} >
                {renderMenu(item.children)}
               </SubMenu>
      }
  
      return pagepermission(item) && <Menu.Item key={item.key} icon={item.icon}  onClick={()=>{
        navigate(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}  className='SiderMenu'>
          <div style={{height:"100%",display:"flex","flexDirection":"column"}}>
          <div style={{color:"white ",textAlign:'center',fontSize:'20px'}} className="logo" children='内部管理系统' />
          <div style={{flex:1,"overflow":"auto"}}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={selectKey}
          defaultOpenKeys={openKey}>
            {/* <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<UploadOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          <SubMenu key="sub2" icon={<UploadOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}

          {renderMenu(menu)}
          </Menu>
          </div>
          </div>
        </Sider>
  )
}
const mapStateToProps =(state)=>{ 
  return state.HeadReducer
}

export default connect(mapStateToProps)(SiderMenu)



