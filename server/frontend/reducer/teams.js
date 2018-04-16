export default function teams(state = [], action ) {
    switch(action.type)
    {
        case 'ADD_TEAM':{
            return [
                ...state,
                action.payload
            ];
        }
        case 'DELETE_TEAM':{
            state = [];
            break;
        }
        default: break;
    }
    return state;
}
