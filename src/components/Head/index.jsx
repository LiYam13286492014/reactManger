import { Layout,Dropdown,Menu ,Avatar} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserSwitchOutlined
    
  } from '@ant-design/icons';



const{Header} =Layout
export default function HeadMenu() {
const[collapsed,setState] = React.useState(false)
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

  function toggle(){
    setState(collapsed => !collapsed)
  }
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
        })}
        <div style={{float:"right"}}>
        <span >欢迎<span style={{color:'blue'}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserSwitchOutlined />} />
        </Dropdown>
        </div>
        
    </Header>
  )
}
