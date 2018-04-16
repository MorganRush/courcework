export default function contracts(state = [], action ) {
    switch(action.type)
    {
        case 'ADD_CONTRACTS':{
            return [
                ...state,
                action.payload
            ];
        }
        case 'DELETE_CONTRACTS':{
            state = [];
            break;
        }
        default: break;
    }
    return state;
}
