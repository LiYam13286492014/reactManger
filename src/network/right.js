import { request } from "./request";

export function getRight(){
    return request({
        url:'/cc?_embed=children'
    })
}

export function getNews(){
    return request({
        url:'/news?_expand=categories&publishState=2'
    })
}