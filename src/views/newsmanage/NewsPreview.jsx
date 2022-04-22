import React from 'react'
import { PageHeader,  Descriptions } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment'

export default function NewsPreview() {
    console.log(useParams());
    const{id} = useParams()
    const[preData,setPreData] = useState([])
    const auditList=['未审核','待审核','已通过','已驳回',]
    const publishList=['未发布','待发布','已发布','已下线']
    useEffect(()=>{
        axios.get(`http://localhost:3001/news/${id}?_expand=categories&_expand=roles`)
        .then(res=>{
            setPreData(res.data)
            console.log(res.data);
            console.log(id);
            
        })
    },[id])

    

  return (
    <div>
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Title"
      subTitle="This is a subtitle"

    >
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="创建者">{preData.author}</Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {moment(preData.createTime).format('YYYY/MM/DD  HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="发布时间">0</Descriptions.Item>
        <Descriptions.Item label="区域">{preData.region}</Descriptions.Item>
        <Descriptions.Item label="审核状态">
        {auditList[preData.auditState]  }
        </Descriptions.Item>
        <Descriptions.Item label="发布状态"> {publishList[preData.publishState]  }</Descriptions.Item>
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
