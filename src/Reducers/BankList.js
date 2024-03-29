const bankListReducer = (state=null,action) =>{
    switch(action.type)
    {   
        case 'FETCH_BANK_LIST': 
            return action.payload;
        default : 
            return state;
    }
}
export default bankListReducer