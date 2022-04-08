import { request } from "./request";

export function getRight(){
    return request({
        url:'/cc?_embed=children'
    })
}