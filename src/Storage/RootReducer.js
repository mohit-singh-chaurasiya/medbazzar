const initialState={
    data:{},
    user:{},
  
}

export default  function RootReducer(state=initialState,action)     //action containe 1)type[get,post], 2)payload
{
    switch(action.type)
    {
        case 'ADD_USER':
        state.user[action.payload[0]]=action.payload[1]     
        // console.log(state.data)       
        return {data:state.data,user:state.user}

        
        case 'ADD_PRODUCT':
        state.data[action.payload[0]]=action.payload[1]     
        console.log(state.data)       
        return {data:state.data,user:state.user}

        

        case 'DELETE_PRODUCT':
        delete state.data[action.payload[0]]
        return {data:state.data,user:state.user}

        

      
     default:
        return {data:state.data,user:state.user}

          
    }
  
}
