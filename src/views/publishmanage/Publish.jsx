import { Button } from 'antd'
import React from 'react'
import NewsPublish from '../../components/publishComponents/NewsPublish'
import { usePublish } from '../../components/publishComponents/usePublish'
export default function Publish() {
    const{dataSource,handleOut} = usePublish(2)
  return (
    <div>
        <NewsPublish dataSource={dataSource} button={(id)=>
            <Button type='dashed' onClick={()=>handleOut(id)}>下线</Button>
        }></NewsPublish>
    </div>
  )
}
