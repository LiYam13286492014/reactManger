import React from 'react'
import { PageHeader,  Descriptions } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment'
import {HeartTwoTone} from '@ant-design/icons'


export default function Detail() {
    console.log(useParams());
    const{id} = useParams()
    const[preData,setPreData] = useState({})
    
    useEffect(()=>{
        axios.get(`http://localhost:3001/news/${id}?_expand=categories&_expand=roles`)
        .then(res=>{
            setPreData({
                ...res.data,
                view: res.data.view+1
            })
            console.log(res.data);
            console.log(id);

            axios.patch(`http://localhost:3001/news/${id}`,{
                view:res.data.view+1
            })
            
        })
    },[id])

    const handleStar=()=>{
        axios.patch(`http://localhost:3001/news/${id}`,{
            star:preData.star +1
        }).then((res)=>{
            console.log(preData);
            setPreData(
                res.data
            )
        })
    }
    

  return (
    <div>
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={preData.title}
      subTitle={<div>
          <span>This is the detail</span>
          <HeartTwoTone onClick={handleStar} twoToneColor="#eb2f96" style={{paddingLeft :'5px'}}/>
      </div>}
      

    >
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="创建者">{preData.author}</Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {moment(preData.createTime).format('YYYY/MM/DD  HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="发布时间">0</Descriptions.Item>
        <Descriptions.Item label="区域">{preData.region}</Descriptions.Item>
        <Descriptions.Item label="访问数量">{preData.view}</Descriptions.Item>
        <Descriptions.Item label="点赞数量">{preData.star}</Descriptions.Item>
        <Descriptions.Item label="评论数量">0</Descriptions.Item>
        
      </Descriptions>
    </PageHeader>

    <div style={{border: "1px solid gray",margin:'24px'}} dangerouslySetInnerHTML={{
        __html:preData.content
    }}>
       
    </div>
    </div>
  )
}
