import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: number;
  img: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
};

type State = {
  value?: {
    product1?: Product;
    product2?: Product;
  };
};

const initialState: State = {};

export const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: () => initialState,
    addProduct: (state: any, action: PayloadAction<any>) => {
      state.value = { ...state.value, ...action.payload };
    },
    increment: (state: any, action: PayloadAction<any>) => {
      state.value[action.payload.type].quantity += 1;
    },
    decrement: (state: any, action: PayloadAction<any>) => {
      if (state.value[action.payload.type].quantity > 1) {
        state.value[action.payload.type].quantity -= 1;
      }
    },
    deleteProduct: (state: any, action: PayloadAction<any>) => {
      delete state.value[action.payload.type];
    },
  },
});

export const { addProduct, increment, decrement, deleteProduct, reset } =
  counter.actions;

export default counter.reducer;
