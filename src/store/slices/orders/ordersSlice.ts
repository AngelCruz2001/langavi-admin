import { IOrder } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addShippingInfo,
  fetchOrder,
  fetchOrders,
  setStatus,
} from "./ordersThunks";

interface IOrdersState {
  ordersList: IOrder[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  activeOrder: IOrder | null;
}

const initialState: IOrdersState = {
  ordersList: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  activeOrder: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Reducer for fetching orders
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase("orders/fetchOrders/pending", (state) => {
      state.loading = true;
      state.error = null;
    });
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.activeOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addShippingInfo.fulfilled, (state, action) => {
        state.activeOrder = action.payload;
        state.ordersList = state.ordersList.map((order) => {
          if (order._id === action.payload._id) {
            return action.payload;
          }
          return order;
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(setStatus.fulfilled, (state, action) => {
        state.ordersList = state.ordersList.map((order) => {
          if (order._id === action.payload._id) {
            return action.payload;
          }
          return order;
        });
        state.loading = false;
        state.error = null;
      });
  },
});

export const { fetchOrdersStart } = ordersSlice.actions;

export default ordersSlice.reducer;
