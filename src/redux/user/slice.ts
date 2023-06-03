import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderModel, UserInfoModel } from 'generated/api';

interface UserState {
    user: UserInfoModel,
    orders: Array<OrderModel>
    orderCount: number,
}

const initialState: UserState = {
    user: {},
    orders: [],
    orderCount: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfoModel>){
      state.user = action.payload
    },
    setOrders(state, action: PayloadAction<Array<OrderModel>>){
      state.orders = action.payload
    },
    setOrderCount(state, action: PayloadAction<number>){
        state.orderCount = action.payload
    }
  },
});

export const { setUser, setOrders, setOrderCount } =
  userSlice.actions;

export default userSlice.reducer;