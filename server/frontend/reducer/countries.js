export default function countries(state = [], action ) {
    switch(action.type)
    {
        case 'ADD_COUNTRIES':{
            return [
                ...state,
                action.payload
            ];
        }
        case 'DELETE_COUNTRIES':{
            state = [];
            break;
        }
        default: break;
    }
    return state;
}
