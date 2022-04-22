
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getNews } from '../../network/right'
import {PageHeader,Card, Col, Row,List} from 'antd'
import _ from 'lodash'

export default function News() {
    const[dataSource,setDataSource] =useState([])

    useEffect(()=>{
        getNews().then(res=>{
            console.log(res);
            setDataSource(Object.entries(_.groupBy(res,item=>item.categories.title)))
            console.log(Object.entries(_.groupBy(res,item=>item.categories.title)));

        })
    },[])
  return (
    <div>
        <PageHeader
            className="site-page-header"
            
            title="全球大新闻"
            subTitle="This is a Big News"
        />

        <div className="site-card-wrapper">
            <Row gutter={16,16}>
                {
                    dataSource.map(item=>{
                        return (
                            <Col key={item[0]} span={8}>
                                <Card title={item[0]} bordered={false} hoverable>
                                <List
                                    size="small"
                                    pagination={{
                                        pageSize:1
                                    }}
                                    
                                    dataSource={item[1]}
                                    renderItem={data => <List.Item><a href={`http://localhost:3000/detail/${data.id}`}>{data.title}</a></List.Item>}
                                />
                                </Card>
                            </Col>
                        )
                        
                    })
                }


            </Row>


        </div>
    </div>
  )
}
