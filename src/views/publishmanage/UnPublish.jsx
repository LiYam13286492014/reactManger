import { Button } from 'antd'
import React from 'react'
import NewsPublish from '../../components/publishComponents/NewsPublish'
import { usePublish } from '../../components/publishComponents/usePublish'
export default function UnPublish() {
    const{dataSource,handlePush} = usePublish(1)
  return (
    <div>
        <NewsPublish dataSource={dataSource} button={(id)=>
            <Button type='primary' onClick={()=>handlePush(id)}>发布</Button>
        }></NewsPublish>
    </div>
  )
}
