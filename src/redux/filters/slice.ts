import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface FiltersState {
    currentShopPage: number,
    currentShopCategory: string
    currentProfilePage: number,
    currentProfileCategory: string,
    categories: string[]
  }

const initialState: FiltersState = {
    currentShopPage: 1,
    currentShopCategory: 'All',
    currentProfilePage: 1,
    currentProfileCategory: 'All',
    categories: []
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentShopPage(state, action: PayloadAction<number>) {
        state.currentShopPage = action.payload
  },
    setCurrentShopCategory(state, action: PayloadAction<string>) {
      state.currentShopCategory = action.payload
  },
    setCurrentProfilePage(state, action: PayloadAction<number>) {
      state.currentShopPage = action.payload
  },
    setCurrentProfileCategory(state, action: PayloadAction<string>) {
      state.currentShopCategory = action.payload
  },
    setCategories(state, action: PayloadAction<string[]>){
      state.categories = action.payload
    }
}
});

export const { 
    setCurrentShopPage,
    setCurrentShopCategory,
    setCurrentProfilePage,
    setCurrentProfileCategory,
    setCategories 
  } = filtersSlice.actions;

export default filtersSlice.reducer;