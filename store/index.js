import { configureStore } from "@reduxjs/toolkit"
import hoverSliceReducer from "./hoverCardSlice"

export const store = configureStore({
  reducer: {
    cardId: hoverSliceReducer
  },
})