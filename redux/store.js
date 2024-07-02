import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import favoritesReducer from "./favoritesReducer";
import filterReducer from "./filterReducer";
export default configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    filter: filterReducer,
  },
});
