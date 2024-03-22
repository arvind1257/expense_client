const customAmountReducer = (state=null,action) =>{
    switch(action.type)
    {   
        case 'FETCH_CUSTOM_AMOUNTS': 
            return action.payload;
        default : 
            return state;
    }
}
export default customAmountReducer