export default function player(state = [{"login": ""}], action ) {
  switch(action.type)
  {
    case 'ADD_USER':{
      state = [];
      return [
        ...state,
        action.payload
      ];
    }
  }
  return state;
}
