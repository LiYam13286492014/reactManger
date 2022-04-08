import React from 'react'
import { Form, Input, Button, message,  } from 'antd';
import ParticlesBg from 'particles-bg'
import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate()

    const onFinish = (value) => {
        console.log(value);
        axios.get(`http://localhost:3001/user?username=${value.username}&password=${value.password}&rolestate=true&_expand=roles`)
        .then(res =>{
            console.log(res.data);
            if(res.data.length ===0){
                message.error('用户或者密码错误')
            }else{
                localStorage.setItem('tt',JSON.stringify(res.data[0]))
                navigate('/',{state:{replace:true}})
            }
        })
      };
    
     
  return (
    <div  style={{height:'100%'}}>
        <ParticlesBg type="random" bg={true}/>
        <div className='loginContain' >
            <div className='headTitle'>内部管理系统</div>
        <Form
            name="basic"
            
            
            onFinish={onFinish}
            
            
    >
      <Form.Item
        
        name="username"
        rules={[{ required: true, message: 'Please input your username!'}]}
      >
        <Input placeholder='username' />
      </Form.Item>

      <Form.Item
       
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='password' />
      </Form.Item>



      <Form.Item >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
 

        </div>
    </div>
  )
}
