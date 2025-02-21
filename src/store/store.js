import { configureStore } from "@reduxjs/toolkit";
import heroesSlice from "../APISlice/heroesSlice";

const store = configureStore({
  reducer: {
    heroes: heroesSlice,
  },
});

export default store;
