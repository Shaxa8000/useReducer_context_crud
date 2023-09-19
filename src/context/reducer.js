import { users } from "../mock";

export const reducer = (state, action) => {
    switch (action.type) {
        // get multiple input value
        case "GET_INPUT_VALUE": return { ...state, [action.payload.field]: action.payload.value };
        
        // search
        case 'SEARCH':
        let res = users.filter(value => `${value[state.search]}`.toLowerCase().includes(action.payload.toLowerCase()));
         return { ...state, data: res };
        
         // search by category
        case "ON_SELECT": return { ...state, search: action.payload };
        
        // delete user
        case "ON_DELETE": 
         let filteredData = state.data.filter((value) => value.id !== action.payload.ids);
         return { ...state, data: filteredData };
         
        // create user
        case "ON_CREATE":
         let newUser = [...state.data, {
           id: state.data.length + 1,
           name: state.name,
           status: state.status
        }];
            return { ...state, data: newUser };
        
        // update user
        case "ON_UPDATE": return {
            ...state,
            select: action.payload.allData.id,
            name: action.payload.allData.name,
            status: action.payload.allData.status,
        };
        
        // save user
        case "ON_SAVE": 
           let updatedValue = state.data.map((value) => value.id === state.select ? { ...value, name: state.name, status: state.status } : value);
           return { ...state, data: updatedValue, select: null };
        
        
        // default
        default: return state
    }
}