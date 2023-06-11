import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Получаем пиццу через редакс
export const fetchProducts = createAsyncThunk(
  'products/fetchProductsStatus',
  async ({ currentPage }) => {
    const { data } = await axios.get(
      `https://testguru.ru/frontend-test/api/v1/items?page=${currentPage}`
    );
    return data.items;
  }
);

export const fetchImages = createAsyncThunk(
  'images/fetchImageStatus',
  async () => {
    const {data} = await axios.get(
      `https://api.unsplash.com/photos?client_id=xUCATjhuz-w76RvvAZDVIJpG7ctNss4X4y1o5e7uWkU`
    );
    // console.log(data);
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
    setProducts(state, action) {
      state.products.push(...action.payload);
    },
  },
  // обрабатываем асинхрон с редаксом fetchproduct
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.push(...action.payload);
      state.status = 'success';
    },
    // ? при ошибке удаляем продукты и покажет страницу с ошибкой
    [fetchProducts.rejected]: (state, action) => {
      state.products = [];
      state.status = 'error';
    },

    [fetchImages.fulfilled]: (state, action) => {
      state.images.push(...action.payload);
      state.status = 'success';
    },
  },
});

export const selectProduct = (state) => state.productSlice

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
