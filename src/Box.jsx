// import { Layout, Menu, Breadcrumb } from "antd";

import 'antd/dist/antd.less'
import './Box.less';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import HeadMenu from './components/Head';
import RightList from './views/rightList/RightList';
import RoleList from './views/rightList/RoleList';
import UserList from './views/UserList';
import NProgress  from 'nprogress';
import 'nprogress/nprogress.css'
import { LoadAction } from './action/sider';






import { Layout,  Spin} from 'antd';
import { Routes,Route } from 'react-router-dom';
import axios from './network/http';
import { connect } from 'react-redux';



import SiderMenu from './components/SiderMenu';
import Notfound from './views/Notfound';
import { useEffect } from 'react';
import NewsAdd from './views/newsmanage/NewsAdd';
import NewsWillPush from './views/newsmanage/NewsWillPush';
import NewsPreview from './views/newsmanage/NewsPreview';
import NewsUpdate from './views/newsmanage/NewsUpdate';
import CheckList from './views/checkmanage/CheckList';
import ChenckPass from './views/checkmanage/ChenckPass';
import Sunset from './views/publishmanage/Sunset';
import Publish from './views/publishmanage/Publish';
import UnPublish from './views/publishmanage/UnPublish';
import NewsCategory from './views/newsmanage/NewsCategory';
import Home from './views/Home/Home';




const {   Content } = Layout;
function Box(props){
 
  const allRouter= {
    '/per-manage/rightlist':<RightList/>,
    '/per-manage/rolelist':<RoleList/>,
    '/user-manage/list':<UserList/>,
    '/news-manage/add':<NewsAdd/>,
    '/news-manage/willpush':<NewsWillPush/>,
    '/news-manage/preview/:id':<NewsPreview/>,
    '/news-manage/update/:id':<NewsUpdate/>,
    '/check-manage/List' : <CheckList/>,
    '/check-manage/check' : <ChenckPass/>,
    "/push-manage/out":<Sunset/>,
    "/push-manage/haven":<Publish/>,
    "/push-manage/new":<UnPublish/>,
    "/news-manage/type":<NewsCategory/>,
    "/home":<Home/>

  }
  const[keyList,setKeyList] = useState([])
  
 useEffect(()=>{
   
   
   Promise.all([
     axios.get('/cc'),
     axios.get('/children')
   ]).then(res =>{
      console.log(res);
     setKeyList([...res[0].data,...res[1].data])
     
    
   })

 },[])
 const {roles:{rights}} = JSON.parse(localStorage.getItem('tt'))
 const checkPermission =(item)=>{
   return (item.pagepermission || item.routerpermission) &&allRouter[item.key]
 }

 const checkRouter= (item)=>{
   return rights.includes(item.key)
 }
  

 NProgress.start()
 useEffect(()=>{NProgress.done()})
  return(
  < Spin spinning={props.isLoading}>  
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
              <Route path='/' element={<Navigate to='/home' />}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
      </Spin>
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

const mapStateToProps = (state)=>{
  console.log(state.LoadReducer);
  
  return state.LoadReducer
}




export default connect(mapStateToProps)(Box);
