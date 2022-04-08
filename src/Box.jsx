// import { Layout, Menu, Breadcrumb } from "antd";

import 'antd/dist/antd.less'
import './Box.less';
import React, { useState } from 'react';
import HeadMenu from './components/Head';
import RightList from './views/rightList/RightList';
import RoleList from './views/rightList/RoleList';
import UserList from './views/UserList';
import NProgress  from 'nprogress';
import 'nprogress/nprogress.css'



import axios from "axios";



import { Layout, } from 'antd';
import { Routes,Route, Navigate } from 'react-router-dom';


import SiderMenu from './components/SiderMenu';
import Notfound from './views/Notfound';
import { useEffect } from 'react';




const {   Content } = Layout;
function Box(){
  const allRouter= {
    '/per-manage/rightlist':<RightList/>,
    '/per-manage/rolelist':<RoleList/>,
    '/user-manage/list':<UserList/>
  }
  const[keyList,setKeyList] = useState([])
  
 useEffect(()=>{
   
   
   Promise.all([
     axios.get('http://localhost:3001/cc'),
     axios.get('http://localhost:3001/children')
   ]).then(res =>{
      console.log(res);
     setKeyList([...res[0].data,...res[1].data])
     
    
   })

 },[])
 const {roles:{rights}} = JSON.parse(localStorage.getItem('tt'))
 const checkPermission =(item)=>{
   return item.pagepermission &&allRouter[item.key]
 }

 const checkRouter= (item)=>{
   return rights.includes(item.key)
 }
  

 NProgress.start()
 useEffect(()=>{NProgress.done()})
  return(
    
    <Layout>
        <SiderMenu/>
        <Layout className="site-layout">
          <HeadMenu/>
          
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* <Routes>
              <Route path='/per-manage/rightlist' element={<RightList/>}></Route>
              <Route path='/per-manage/rolelist' element={<RoleList/>}></Route>
              <Route path='/user-manage/list' element={<UserList/>}></Route>
              <Route path='*' element={<Notfound/>}></Route>
              
            </Routes> */}

            <Routes>
              {
                keyList.map(item=>{
                  if(checkPermission(item)&&checkRouter(item)){
                    return <Route key={item.key} path={item.key} element={allRouter[item.key]} exact></Route>
                  }else{
                    return null
                  }
                })
              }

              <Route path='*' element={<Notfound/>}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
  )
}


// const { Header, Content, Footer } = Layout;

// const postData = ()=>{
//   axios.post('http://localhost:3001/cc',{
//     id:2,
//     name:'tutu'
//   })
// }
// function App() {
//   return (
//     <Layout className="layout">
//     <Header>
//       <div className="logo" />
//       <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
//         {new Array(15).fill(null).map((_, index) => {
//           const key = index + 1;
//           return <Menu.Item key={key} onClick={postData}>{`nav ${key}`}</Menu.Item>;
//         })}
//       </Menu>
//     </Header>
//     <Content style={{ padding: '0 50px' }}>
//       <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>List</Breadcrumb.Item>
//         <Breadcrumb.Item>App</Breadcrumb.Item>
//       </Breadcrumb>
//       <div className="site-layout-content">Content</div>
//     </Content>
//     <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//   </Layout>
  
//   )
    
  
// }



export default Box;
