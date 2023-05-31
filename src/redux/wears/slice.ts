import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderModel, UserInfoModel, WearModel } from 'generated/api';

interface WearsState {
    wears: WearModel[]
}

const initialState: WearsState = {
    wears: []
};

const wearsSlice = createSlice({
  name: 'wears',
  initialState,
  reducers: {
    setWears(state, action: PayloadAction<Array<WearModel>>){
      state.wears = action.payload
    },
  },
});

export const { setWears } =
  wearsSlice.actions;

export default wearsSlice.reducer;