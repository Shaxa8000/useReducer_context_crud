import { createContext, useReducer } from "react";
import { users } from "../mock";
import { reducer } from "./reducer";

export const CrudContext = createContext();

export const GlobalContext = ({ children }) => {
    
    const [state, dispatch] = useReducer(reducer, {
        data: users,
        name: "",
        status: "",
        search: "",
        select: null,        
    })
    
    
    return (
        <CrudContext.Provider value={[state, dispatch]}>
            {children}
        </CrudContext.Provider>
    )
}

export default GlobalContext