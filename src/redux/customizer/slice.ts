import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClothItem } from 'types/types';

interface CustomizerState {
    itemToCustomize?: ClothItem, //replace by actual item type
    designState: {} | undefined
  }

const initialState: CustomizerState = {
    itemToCustomize: undefined,
    designState: undefined
};

const customizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<ClothItem>){
      state.itemToCustomize = action.payload
    },
    setDesignState(state, action: PayloadAction<Object>){
      state.designState = action.payload
    }
  },
});

export const { setItem, setDesignState } =
  customizerSlice.actions;

export default customizerSlice.reducer;