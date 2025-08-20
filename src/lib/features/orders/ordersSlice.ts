import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CardInfo = {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
};

export type OrderProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  attributes: string[];
  discount: any;
};

export type Order = {
  id: string;
  products: OrderProduct[];
  total: number;
  cardInfo: CardInfo;
  createdAt: string;
  userId: number;
  userName: string;
};

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
