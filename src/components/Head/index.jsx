import { Layout,Dropdown,Menu ,Avatar} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';
import { HeadReducer } from '../../reducer/HeadReducer';
import { HeadAction } from '../../action/head';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserSwitchOutlined
    
  } from '@ant-design/icons';
import { useEffect } from 'react';



const{Header} =Layout


 function HeadMenu(props) {
  const[collapsed,setState] = useState(false)
  const navigate = useNavigate()
  const {username} = JSON.parse(localStorage.getItem('tt'))


const menu = (
    <Menu>
      <Menu.Item>
        
      </Menu.Item>

      <Menu.Item danger onClick={()=>{
        console.log(localStorage);
        localStorage.removeItem('tt')
        navigate('/login',{replace:true})
      }}>退出</Menu.Item>
    </Menu>
  );
//   {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//     className: 'trigger',
//     onClick: toggle,
// })}
  function toggle(){
   console.log(props);
   
    // setState(collapsed => !collapsed)
    // console.log(collapsed);
    props.ChangIt()
    

    
  }

 
    PubSub.publish('aa',collapsed)
  
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
        {props.isCollapsed ? <MenuUnfoldOutlined onClick={toggle} /> : <MenuFoldOutlined onClick={toggle}/>
            
            
        }
        <div style={{float:"right"}}>
        <span >欢迎<span style={{color:'blue'}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserSwitchOutlined />} />
        </Dropdown>
        </div>
        
    </Header>
  )
}
const mapStateToProps = (state)=>{
  console.log(state);
  
  return state.HeadReducer
}

const mapDispatchToProps=()=>{
  console.log('1');
  return {
    
    ChangIt :HeadAction
  }
}

export default connect(mapStateToProps,mapDispatchToProps())(HeadMenu)