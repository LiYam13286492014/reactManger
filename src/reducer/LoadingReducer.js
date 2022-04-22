export  const LoadReducer = (preState={isLoading:false},action) =>{
    const {type,payload} =action 
    
    switch(type){
        case  'chang_load' :
           let newState = {...preState} 
           newState.isLoading = payload
           
           return newState


           default :
           return preState
            
    }
}