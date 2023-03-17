import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "./slices/orders/ordersSlice";
import discountsSlice from "./slices/discounts/discountsSlice";
import authSlice from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    orders: ordersSlice,
    discounts: discountsSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
