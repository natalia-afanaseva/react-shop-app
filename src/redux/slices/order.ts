import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface OrderState {
  products: {
    [key: string]: number;
  };
  isEmpty: boolean;
  totalItemsNumber: number;
}

// Define the initial state using that type
const initialState: OrderState = {
  products: {},
  isEmpty: true,
  totalItemsNumber: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string | undefined>) => {
      // product id
      if (!action.payload) return;

      if (state.products[action.payload]) {
        state.products[action.payload]++;
      } else {
        state.products[action.payload] = 1;
      }

      if (state.isEmpty) {
        state.isEmpty = false;
      }

      state.totalItemsNumber = Object.values(state.products).reduce(
        (prev, curr) => prev + curr,
        0
      );
    },

    decrement: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) return;
      if (!state.products[action.payload]) {
        return;
      }

      if (state.products[action.payload] - 1 <= 0) {
        delete state.products[action.payload];
        state.totalItemsNumber = Object.values(state.products).reduce(
          (prev, curr) => prev + curr,
          0
        );
        if (Object.keys(state.products).length === 0) {
          state.isEmpty = true;
          state.totalItemsNumber = 0;
        }
      }
    },

    addToCart: (
      state,
      action: PayloadAction<{ id: string | undefined; val: number }>
    ) => {
      if (!action.payload.id) return;
      //   if (state.products[action.payload.id]) {
      //     state.products[action.payload.id] += action.payload.val;
      //   } else {
      //     state.products[action.payload.id] = action.payload.val;
      //   }
      state.products[action.payload.id] = action.payload.val;

      if (state.isEmpty) {
        state.isEmpty = false;
      }

      state.totalItemsNumber = Object.values(state.products).reduce(
        (prev, curr) => prev + curr,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload || !state.products[action.payload]) {
        return;
      }

      delete state.products[action.payload];
      state.totalItemsNumber = Object.values(state.products).reduce(
        (prev, curr) => prev + curr,
        0
      );
      if (Object.keys(state.products).length === 0) {
        state.isEmpty = true;
        state.totalItemsNumber = 0;
      }
    },

    emptyCart: (state) => {
      state.isEmpty = true;
      state.products = {};
      state.totalItemsNumber = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, addToCart, removeFromCart, emptyCart } =
  orderSlice.actions;

export default orderSlice.reducer;
