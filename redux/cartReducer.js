import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { name } = action.payload;
      const existingItem = state.cart.find((item) => item.name === name);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
        existingItem.quantity++;
      } else {
        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const { name } = action.payload;
      const index = state.cart.findIndex((item) => item.name === name);

      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },

    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (itemInCart) {
        itemInCart.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (itemInCart) {
        if (itemInCart.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => item.name !== action.payload.name
          );
        } else {
          itemInCart.quantity--;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
