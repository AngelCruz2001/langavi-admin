import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "./slices/orders/ordersSlice";

const store = configureStore({
  reducer: {
    orders: ordersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
