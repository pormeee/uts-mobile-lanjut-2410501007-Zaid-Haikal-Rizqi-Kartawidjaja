import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
}

export function FavoriteProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 🔥 LOAD DATA SAAT APP DIBUKA
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await AsyncStorage.getItem("favorites");
        if (data) {
          dispatch({
            type: "SET_FAVORITES",
            payload: JSON.parse(data),
          });
        }
      } catch (error) {
        console.log("Error load favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  // 🔥 SIMPAN SETIAP ADA PERUBAHAN
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites)
        );
      } catch (error) {
        console.log("Error save favorites:", error);
      }
    };

    saveFavorites();
  }, [state.favorites]);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
}