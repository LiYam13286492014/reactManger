import React from 'react'

import { Button, Steps, Form, Input,  Select, message,notification } from 'antd';
import { PageHeader } from 'antd';
import { useState } from 'react';
import './NewsAdd.less'
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import {  convertToRaw ,ContentState,EditorState} from 'draft-js';



const { Step } = Steps;
const {Option} = Select
const layout = {
    labelCol: { span: 3},
    wrapperCol: { span: 21 },
  };
export default function NewsUpdate() {
    const{id}=useParams()
    const[currentId,setCurrentId] =useState(0)
    const [form] = Form.useForm();
    const[categories,setCategories] =useState([])
    const[editorState,setEditorState]=useState('')
    const[formData,setFormData] =useState('')
    const[contentData,setContentData] =useState('')
    
    const myRef = useRef()
    const navigate= useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3001/categories').then(res=>{
            setCategories(res.data)
        })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/news/${id}?_expand=categories&_expand=roles`).then(res=>{
            setContentData(res.data.content)
            console.log(res.data.content);
            console.log(res.data);
            let{title,categories:{id}} =res.data
            myRef.current.setFieldsValue({
                title,
                categoriesId:id
            })

            const contentBlock = htmlToDraft(res.data.content);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
              }
        })
    },[id])

   


    const toStep=(data)=>{
        
        if(currentId===0){
            myRef.current.validateFields().then((res)=>{
                setFormData(res)
                console.log(res);
                setCurrentId(currentId +data)
            }).catch(err=>{
                console.log(err);
            })
        }else{
            if(data===1&&contentData===''||contentData==='<p></p>')
            {
                message.info('None')
            }else{
                console.log(currentId); 
                setCurrentId(currentId +data)
            }
        }
       
    }
    // const{region,rolesId,username}=JSON.parse(localStorage.getItem('tt'))
    const handlesave=(auditState)=>{
        axios.patch(`http://localhost:3001/news/${id}`,{
            ...formData,
            "content":contentData,
            "auditState":auditState,

            
        }).then(()=>{
            
                navigate(auditState===0?'/news-manage/willpush':'/check-manage/ed')

                notification.info({
                    message: "通知:",
                    description:
                      `已进入${auditState===0?'草稿箱':'审核列表'}`,
                    placement:'bottomRight'
                  });
        })
    }

    const handleCheck=()=>{
        axios.patch(`http://localhost:3001/news/${id}`,{

            "auditState":1,

            
        }).then((res)=>{
            
                navigate(res.data.auditState===0?'/news-manage/willpush':'/check-manage/ed')

                notification.info({
                    message: "通知:",
                    description:
                      `已进入${res.data.auditState===0?'草稿箱':'审核列表'}`,
                    placement:'bottomRight'
                  });
        })
    }
  return (
    
    <div>
        <PageHeader
            style={{'border': '1px solid rgb(235, 237, 240)','marginBottom':'10px'}}
            className="site-page-header"
            onBack={() =>navigate(-1)}
            title="Title"
            subTitle="This is a subtitle"
        />
        <Steps current={currentId}>
            <Step title="Finished" description="This is a description." />
            <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
            <Step title="Waiting" description="This is a description." />
        </Steps>
        <div>
            {
                currentId===0&& 
                <div  style={{marginTop:"50px"}}>
                        <Form {...layout} form={form} name="control-hooks" ref={myRef} >
                            <Form.Item name="title" label="新闻标题" rules={[{ required: true ,message:'pelease input your title'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="categoriesId" label="新闻分类" rules={[{ required: true,message:'pelease input your categoriesId' }]}>
                                <Select
                                placeholder="Select a option and change input text above"
                               
                                allowClear
                                >
                                {
                                    categories.map(item=>{
                                        return <Option key={item.id} value={item.id}>{item.title}</Option>
                                    })
                                }
                                </Select>
                            </Form.Item>
                        </Form>
                </div>

                
            }
            {
                currentId===1&&
                <div>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(editorState)=>{
                            setEditorState(editorState)
                        }}

                        onBlur={()=>{
                            setContentData(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                            console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                        }}
                        />
                </div>
            }
        </div>
        <div style={{marginTop:"50px"}}>
            {
                currentId>0 && <Button type='parmary' children='上一步' onClick={()=>{toStep(-1)}}/>
            }

            {
                currentId<2 && <Button type='parmary' children='下一步' onClick={()=>{toStep(1)}}/>
            }
            {
                currentId===2 && 
                <span><Button type='parmary' children='保存草稿' onClick={()=>handlesave(0)}  />
                <Button type='parmary' danger children='提交审核' onClick={()=>handleCheck()}  /></span>
            }
        </div>
       
    </div>
  )
}
