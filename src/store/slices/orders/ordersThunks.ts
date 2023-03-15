import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersStart } from "./ordersSlice";
import { get, post } from "@/api/langaviApi";
import { IOrderResponse, IOrder } from "../../../interfaces/order";

// Thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { dispatch }) => {
    try {
      // Dispatch the fetch orders start action
      dispatch(fetchOrdersStart());

      // Call the API to fetch orders
      const response = await get<IOrderResponse>("/pedidos");

      // Return the fetched orders
      return response.orders;
    } catch (error: any) {
      // Dispatch the fetch orders error action with the error message as the payload
      // dispatch(fetchOrdersError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (id: string, { dispatch }) => {
    try {
      // Dispatch the fetch orders start action
      dispatch(fetchOrdersStart());

      // Call the API to fetch orders
      const response = await get<{
        order: IOrder;
      }>(`/pedidos/${id}`);

      // Dispatch the fetch orders success action with the fetched orders as the payload
      // dispatch(fetchOrderSuccess(response.order));

      // Return the fetched orders
      return response.order;
    } catch (error: any) {
      // Dispatch the fetch orders error action with the error message as the payload
      // dispatch(fetchOrdersError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);

export const setStatus = createAsyncThunk(
  "orders/setStatus",
  async (data: { id: string; status: string }, { dispatch }) => {
    try {
      // Dispatch the fetch orders start action
      dispatch(fetchOrdersStart());

      // Call the API to fetch orders
      const response = await get<{
        order: IOrder;
      }>(`/pedidos/${data.id}/status/${data.status}`);

      // Return the fetched orders
      return response.order;
    } catch (error: any) {
      // Dispatch the fetch orders error action with the error message as the payload
      // dispatch(fetchOrdersError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);

export const addShippingInfo = createAsyncThunk(
  "orders/addShippingInfo",
  async (
    data: {
      id: string;
      shippingInfo: { guideNumber: string; shippingProvider: string };
      shippingPrice: number;
    },
    { dispatch }
  ) => {
    try {
      // Dispatch the fetch orders start action
      dispatch(fetchOrdersStart());

      // Call the API to fetch orders
      const response = await post<IOrderResponse>(`/pedidos/${data.id}`, {
        shippingInfo: data.shippingInfo,
        shippingPrice: data.shippingPrice,
      });

      console.log(response)
      // Return the fetched orders
      return response.order;

    } catch (error: any) {
      // Dispatch the fetch orders error action with the error message as the payload
      // dispatch(fetchOrdersError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);
