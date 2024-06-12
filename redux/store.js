import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import favoritesReducer from "./favoritesReducer";
export default configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
