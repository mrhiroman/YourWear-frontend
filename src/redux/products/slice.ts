import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ProductsState {
    currentPage: number,
    productsCount: number
  }

const initialState: ProductsState = {
    currentPage: 1,
    productsCount: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
    },
    setProductsCount(state, action: PayloadAction<number>) {
      state.productsCount = action.payload;
  },
}
});

export const { setCurrentPage, setProductsCount } =
  productsSlice.actions;

export default productsSlice.reducer;