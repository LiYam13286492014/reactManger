import React,{  forwardRef } from 'react'
import {  Form, Input, Select } from 'antd'

const {Option} = Select

const  UserFrom=forwardRef((props,ref) =>{
    const {rolesId,username,region} = JSON.parse(localStorage.getItem('tt'))
    const obj={
        "1":"superadmin",
        "2":'admin',
        "3":'editor'}

    const checkRegionDisabled= (item)=>{
        if(props.isUpdate){
            if(obj[rolesId] ==='superadmin'){
                return false
            }else{
                return true}
        }else{
            if(obj[rolesId] ==='superadmin'){
                return false
            }else{
            return    item.region !== region
            }
        }
    }

    const checkRoleDisabled =(item)=>{
        if(props.isUpdate){
            if(obj[rolesId] ==='superadmin'){
                return false
            }else{
                return true}
        }else{
            if(obj[rolesId] ==='superadmin'){
                return false
            }else{
            return    obj[item.id] !== 'editor'
            }
        }
    }

  return (
    <Form layout='vertical' ref={ref}>
    <Form.Item 
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input/>
    </Form.Item>

    <Form.Item 
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input/>
    </Form.Item>

    <Form.Item
        label="区域"
        name="region"
        rules={[{required:true}]}>
        <Select>
           {
               props.regionList.map(item =>{
                   return (
                       <Option disabled={checkRegionDisabled(item)} key={item.id} value={item.value}>{item.title}</Option>
                   )
               })
           } 
        </Select>
    </Form.Item>

    <Form.Item
        label="角色"
        name="rolesId"
        rules={[{required:true}]}
        >
        <Select>
           {
              props.roleList.map(item =>{
                   return (
                       <Option disabled={checkRoleDisabled(item)} key={item.id} value={item.id }>{item.rolename}</Option>
                   )
               })
           } 
        </Select>
    </Form.Item>
</Form>
  )
})
export default UserFrom
