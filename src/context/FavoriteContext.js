import { createContext, useReducer } from "react";

export const FavoriteContext = createContext();

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
  const exists = state.favorites.find(
    (item) => item.id === action.payload.id
  );

  if (exists) {
    return state; 
  }

  return {
    ...state,
    favorites: [...state.favorites, action.payload],
  };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function FavoriteProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
}