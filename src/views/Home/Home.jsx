import React from 'react'
import { Card, Col, Row,List,Avatar,Drawer, Button, Radio, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import * as echarts from 'echarts';
import _ from 'lodash'
import { useRef } from 'react';
import moment from 'moment';

const { Meta } = Card;
export default function Home() {
    const[dataSource,setDataSource] = useState([])
    const[starSource,setStarSource] =useState([])
    const[visible,setVisible]= useState(false)
    const[initData,setInitData]=useState(null)
    const[allData,setAllData] =useState([])
    const{username,region,roles:{rolename}}=JSON.parse(localStorage.getItem('tt'))
    const barRef = useRef()
    const pieRef =useRef()
    
    useEffect(()=>{
        axios.get('http://localhost:3001/news?_expand=categories&_sort=view&publishState=2&_order=desc')
        .then(res=>{
            setDataSource(res.data)
        })
    },[])
    useEffect(()=>{
        axios.get('http://localhost:3001/news?_expand=categories&_sort=star&publishState=2')
        .then(res=>{
            setStarSource(res.data)
        })
    },[])

    useEffect(()=>{
        axios.get('http://localhost:3001/news?_expand=categories&publishState=2')
        .then(res=>{
            setAllData(res.data)
            console.log(_.groupBy(res.data,item=>item.categories.title));
            renderChart(_.groupBy(res.data,item=>item.categories.title))
            return ()=>{
                window.onresize =null
            }
        })
    },[])

    const handleDraw = ()=>{

        setTimeout(() => {
            setVisible(true)
            rederPieChart()
        },0);
        
    }

   
    const renderChart =(obj)=>{
        
       // 基于准备好的dom，初始化echarts实例
       var myChart = echarts.init(barRef.current);

       // 指定图表的配置项和数据
       var option = {
         title: {
           text: '发布统计'
         },
         tooltip: {},
         legend: {
           data: ['数量']
         },
         xAxis: {
           data: Object.keys(obj)
         },
         yAxis: {
            minInterval: 1
         },
         series: [
           {
             name: '数量',
             type: 'bar',
             data: Object.values(obj).map(item=>item.length),

           }
         ]
       };
 
       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
       window.onresize=()=>{
           myChart.resize()
       }
    }

    const rederPieChart=()=>{
        var myChart;
       if(!initData){
           myChart = echarts.init(pieRef.current);
           setInitData(myChart)
       }else{
           myChart = initData
       }

       const groupList = _.groupBy(allData,item=>item.categories.title)
       console.log(groupList);

       const list = []
       for(var i in groupList ){
           list.push({
               name: i,
               value: groupList[i].length
       })
    }

       console.log(list);
       
       
         

          var  option = {
        title: {
            text: '个人发布类型统计',
            subtext: moment(Date.now()).format('YYYY/MM/DD  HH:mm:ss'),
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: list,

            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
        };

        option && myChart.setOption(option);

    }
    
  return (
    <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="浏览排行" bordered={true}>
            <List
                size='small'
                dataSource={dataSource}
                renderItem={item => (
                <List.Item>
                    <a href={`http://localhost:3000/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
    )}
             />    
        </Card>
      </Col>
      <Col span={8}>
        <Card title="点赞排行" bordered={true}>
        <List
                size='small'
                dataSource={starSource}
                renderItem={item => (
                <List.Item>
                    <a href={`http://localhost:3000/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
    )}
             />  
        </Card>
      </Col>
      <Col span={8}>
        <Card
        style={{ width: 300 }}
        cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        }
        actions={[
        <SettingOutlined key="setting"  onClick={handleDraw}/>,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={username}
        description={
            <div>
                <b>{region===''?'全球':'region'}</b>
                <span style={{paddingLeft:'15px'}}>{rolename}</span>
            </div>
        }
        />
        </Card>
      </Col>
    </Row>

    <div ref={barRef} id='main' style={{height:"300px",width:'100%'}}>
        
    </div >

    <Drawer
          title="Basic Drawer"
          placement={'right'}
          closable={true}
          onClose={()=>setVisible(false)}
          visible={visible}
          width="500px"
          height='100%'
          
          
        >
        <div ref={pieRef} style={{height:"100%",width:'500px'}}>

        </div>
    </Drawer>
       

  </div>
  )
}
