import { IOrder, IOrdersSingle } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import {
  addShippingInfo,
  fetchOrder,
  fetchOrders,
  setStatus,
} from "./ordersThunks";

interface IOrdersState {
  ordersList: IOrdersSingle[];
  currentPage: number;
  totalPages: number;
  formLoading: boolean;
  loading: boolean;
  error: string | null;
  activeOrder: IOrder | null;
}

const initialState: IOrdersState = {
  ordersList: [],
  formLoading: false,
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
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.activeOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addShippingInfo.fulfilled, (state, action) => {
        state.activeOrder = action.payload;
        state.error = null;
        state.formLoading = false;
      })
      .addCase(addShippingInfo.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(setStatus.fulfilled, (state, action) => {
        state.ordersList = state.ordersList.map((order) => {
          if (order._id === action.payload._id) {
            return action.payload;
          }
          return order;
        });
        state.activeOrder = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { fetchOrdersStart } = ordersSlice.actions;

export default ordersSlice.reducer;
