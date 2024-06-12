import { createSlice } from "@reduxjs/toolkit";
export const favoriteSlide = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      const itemToAdd = action.payload;
      const existingIndex = state.favorites.findIndex(
        (item) => item.name === itemToAdd.name
      );
      if (existingIndex === -1) {
        state.favorites.push(itemToAdd);
      }
    },
    removeFromFavorite: (state, action) => {
      const { name } = action.payload;
      state.favorites = state.favorites.filter((item) => item.name !== name);
    },
  },
});
export const { addToFavorite, removeFromCart } = favoriteSlide.actions;
export default favoriteSlide.reducer;
