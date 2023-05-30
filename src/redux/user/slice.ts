import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderModel, UserInfoModel } from 'generated/api';

interface UserState {
    user: UserInfoModel,
    orders: Array<OrderModel>
}

const initialState: UserState = {
    user: {},
    orders: []
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
    }
  },
});

export const { setUser, setOrders } =
  userSlice.actions;

export default userSlice.reducer;