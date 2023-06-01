import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderModel, UserInfoModel, WearModel } from 'generated/api';

interface WearsState {
    wears: WearModel[],
    featured: WearModel[],
    wearCount: number
}

const initialState: WearsState = {
    wears: [],
    featured: [],
    wearCount: 0
};

const wearsSlice = createSlice({
  name: 'wears',
  initialState,
  reducers: {
    setWears(state, action: PayloadAction<Array<WearModel>>){
        state.wears = action.payload
    },
    setFeaturedWears(state, action: PayloadAction<Array<WearModel>>){
        state.featured = action.payload
    },
    setWearCount(state, action: PayloadAction<number>){
        state.wearCount = action.payload
    }
  },
});

export const { setWears, setFeaturedWears, setWearCount } =
  wearsSlice.actions;

export default wearsSlice.reducer;