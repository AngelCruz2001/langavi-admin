import { IDiscount } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createDiscount,
  deleteDiscount,
  editDiscount,
  fetchDiscounts,
} from "./discountsThunks";

interface IDiscountsState {
  discountsList: IDiscount[];
  loading: boolean;
  error: string | null;
  activeDiscount: IDiscount | null;
  formLoading: boolean;
}

const initialState: IDiscountsState = {
  discountsList: [],
  loading: false,
  error: null,
  activeDiscount: null,
  formLoading: false,
};

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    // Reducer for fetching discounts
    fetchDiscountsStart(state) {
      state.loading = true;
      state.error = null;
    },
    setActiveDiscount(state, action) {
      state.activeDiscount = action.payload;
    },
    clearActiveDiscount(state) {
      state.activeDiscount = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.discountsList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDiscount.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(
        createDiscount.fulfilled,
        (state, action: PayloadAction<IDiscount>) => {
          state.discountsList.push(action.payload);
          state.formLoading = false;
        }
      )
      .addCase(editDiscount.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(
        editDiscount.fulfilled,
        (state, action: PayloadAction<IDiscount>) => {
          state.discountsList = state.discountsList.map((discount) => {
            if (discount._id === action.payload._id) {
              return action.payload;
            }
            return discount;
          });
          state.formLoading = false;
        }
      )
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.discountsList = state.discountsList.filter(
          (discount) => discount._id !== action.payload
        );
      });
  },
});

export const { fetchDiscountsStart, setActiveDiscount, clearActiveDiscount } =
  discountsSlice.actions;

export default discountsSlice.reducer;
