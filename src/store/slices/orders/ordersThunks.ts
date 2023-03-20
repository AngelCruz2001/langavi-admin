import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersStart } from "./ordersSlice";
import { get, post, put } from "@/api/langaviApi";
import {
  IOrderResponse,
  IOrder,
  IEditOrderResponse,
  OrderStatusType,
} from "@/interfaces/order";
import { toast } from "react-hot-toast";

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
  async (data: { orderId: string; status: OrderStatusType }, { dispatch }) => {
    try {
      // Call the API to fetch orders
      const response = await put(`/pedidos/${data.orderId}`, {
        status: data.status,
      });

      // Return the fetched orders
      return response.order;
    } catch (error: any) {
      // Dispatch the fetch orders error action with the error message as the payload
      // dispatch(fetchOrdersError(error.message));
      toast.error(error.message);
      // Re-throw the error to propagate it
      throw error;
    }
  }
);

export const addShippingInfo = createAsyncThunk(
  "orders/addShippingInfo",
  async (
    data: {
      orderId: string;
      shippingInfo: { guideNumber: string; shippingProvider: string };
      closeModal: () => void;
      // shippingPrice: number;
    },
    { dispatch }
  ) => {
    try {
      // Call the API to fetch orders
      const response = await post<IEditOrderResponse>(
        `/pedidos/${data.orderId}`,
        {
          ...data.shippingInfo,
        }
      );

      if (response.order) {
        dispatch(setStatus({ orderId: data.orderId, status: "enviado" }));
        toast.success("Información de envío agregada");
        data.closeModal();
      }

      // Return the fetched orders
      return response.order;
    } catch (error: any) {
      // Dispatch the fetch orders error action with the error message as the payload
      // dispatch(fetchOrdersError(error.message));

      // toast.error(error.message);
      // return error.message;
      return null;

      // Re-throw the error to propagate it
      throw error;
    }
  }
);
