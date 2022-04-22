export  const HeadReducer = (preState={isCollapsed:false},action) =>{
    const {type} =action 
    
    switch(type){
        case  'chang_it' :
           let newState = {...preState} 
           newState.isCollapsed = !newState.isCollapsed
           
           return newState


           default :
           return preState
            
    }
}