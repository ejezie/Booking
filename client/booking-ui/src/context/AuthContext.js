import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
    switch(action.type){
        case "NEW_SEARCH":
          return action.payload
        case "RESET_SEARCH":
          return INITIAL_STATE;
        default: 
          return state;
    }
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

    return(
      <AuthContext.Provider value={{city: state.city, dates: state.dates, options: state.options, dispatch}}>
        {children}
      </AuthContext.Provider>
    )
}