export default function player(state = [], action ) {
    switch(action.type)
    {
        case 'ADD_PLAYER':{
            state = [];
            return [
                ...state,
                action.payload
            ];
        }
    }
    return state;
}
