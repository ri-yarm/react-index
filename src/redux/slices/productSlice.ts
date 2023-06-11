/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface FetchProductsArgs {
  currentPage: number;
}

// Получаем пиццу через редакс
export const fetchProducts = createAsyncThunk(
  'products/fetchProductsStatus',
  async ({ currentPage }: FetchProductsArgs) => {
    const { data } = await axios.get(
      `https://testguru.ru/frontend-test/api/v1/items?page=${currentPage}`
    );
    return data.items;
  }
);

// ! unsplash возвращает, одни и те же фотографии,
// можно было использовать те же, не делая ещё один запрос, но в чём тогда прикол?))
export const fetchImages = createAsyncThunk(
  'images/fetchImageStatus',
  async () => {
    const {data} = await axios.get(
      `https://api.unsplash.com/photos?client_id=xUCATjhuz-w76RvvAZDVIJpG7ctNss4X4y1o5e7uWkU`
    );
    return data;
  }
);

const initialState = {
  products: [],
  images: [],
  status: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /* setProducts(state, action) {
      state.products.push(...action.payload);
    }, */
  },
  // обрабатываем асинхрон с редаксом fetchproduct
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.push(...action.payload);
        state.status = 'success';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.status = 'error';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images.push(...action.payload);
        state.status = 'success';
      });
  },
});

export const selectProduct = (state) => state.productSlice

// export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
