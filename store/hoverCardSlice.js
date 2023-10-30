import { createSlice } from "@reduxjs/toolkit";
export const hoverSlice = createSlice({
  name: "hover",
  initialState: {
    cardId: null,
  },
  reducers: {
    hoverOver: (state, action) => {
      state.cardId = action.payload;
    },
    hoverOut: (state) => {
      state.cardId = null;
    },
  },
});

export const { hoverOver, hoverOut } = hoverSlice.actions;
export default hoverSlice.reducer;
