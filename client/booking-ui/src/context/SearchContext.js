import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const SearchContext = createContext(INITIAL_STATE);

const searchReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            }
        default: 
          return state;
    }
}

export const SearchContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

    return(
      <SearchContext.Provider value={{city: state.city, dates: state.dates, options: state.options, dispatch}}>
        {children}
      </SearchContext.Provider>
    )
}