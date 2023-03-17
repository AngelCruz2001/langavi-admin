import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDiscountsStart } from "./discountsSlice";
import { IDiscount, IDiscountResponse } from "@/interfaces";
import { del, get, post, put } from "@/api/langaviApi";
import { toast } from "react-hot-toast";

export const fetchDiscounts = createAsyncThunk(
  "discounts/fetchDiscounts",
  async (_, { dispatch }) => {
    try {
      // Dispatch the fetch discounts start action
      dispatch(fetchDiscountsStart());

      // Call the API to fetch discounts
      const response = await get<IDiscountResponse>("/cupones");

      // Return the fetched discounts
      return response.discounts;
    } catch (error: any) {
      // Dispatch the fetch discounts error action with the error message as the payload
      // dispatch(fetchDiscountsError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);

export const editDiscount = createAsyncThunk(
  "discounts/editDiscount",
  async (
    data: {
      id: string;
      discount: {
        code: string;
        percentage?: number;
        quantity?: number;
        active: boolean;
      };
      closeModal: () => void;
    },
    { dispatch }
  ) => {
    try {
      // Dispatch the fetch discounts start action
      dispatch(fetchDiscountsStart());

      // Call the API to fetch discounts
      const response = await put(`/cupones/${data.id}`, data.discount);

      if (response.discount) {
        data.closeModal();
        toast.success("Descuento editado con éxito");
      }

      console.log(data.discount);
      console.log(response);

      // Return the fetched discounts
      return response.discount as IDiscount;
    } catch (error: any) {
      // Dispatch the fetch discounts error action with the error message as the payload
      // dispatch(fetchDiscountsError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);

export const createDiscount = createAsyncThunk(
  "discounts/createDiscount",
  async (
    data: {
      discount: {
        code: string;
        percentage?: number;
        quantity?: number;
        active: boolean;
      };
      closeModal: () => void;
    },
    { dispatch }
  ) => {
    try {
      // Dispatch the fetch discounts start action
      dispatch(fetchDiscountsStart());

      console.log(data.discount);
      // Call the API to fetch discounts
      const response = await post<{
        discount: IDiscount;
      }>(`/cupones`, data.discount);

      if (response.discount) {
        data.closeModal();
        toast.success("Descuento creado con éxito");
      }
      console.log(response);
      // Return the fetched discounts
      return response.discount;
    } catch (error: any) {
      // Dispatch the fetch discounts error action with the error message as the payload
      // dispatch(fetchDiscountsError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discounts/deleteDiscount",
  async (id: string, { dispatch }) => {
    try {
      // Dispatch the fetch discounts start action
      dispatch(fetchDiscountsStart());

      // Call the API to fetch discounts
      const response = await del(`/cupones/${id}`);

      // Return the fetched discounts
      return id;
    } catch (error: any) {
      // Dispatch the fetch discounts error action with the error message as the payload
      // dispatch(fetchDiscountsError(error.message));

      // Re-throw the error to propagate it
      throw error;
    }
  }
);
