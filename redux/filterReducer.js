// redux/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    selectedOptions: {},
  },
  reducers: {
    setSelectedOption(state, action) {
      const { option, isSelected } = action.payload;
      state.selectedOptions = {
        ...state.selectedOptions,
        [option]: isSelected,
      };
    },
  },
});

export const { setSelectedOption } = filterSlice.actions;
export default filterSlice.reducer;
