import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  category: string | null;
  colors: string[];
  priceRange: [number, number];
  sizes: string[];
  dressStyle: string | null;
}

export interface ShopState {
  filters: FilterState;
  filteredProducts: any[];
  isFiltered: boolean;
}

const initialState: ShopState = {
  filters: {
    category: null,
    colors: [],
    priceRange: [0, 250],
    sizes: [],
    dressStyle: null,
  },
  filteredProducts: [],
  isFiltered: false,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload;
    },
    setColors: (state, action: PayloadAction<string[]>) => {
      state.filters.colors = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setSizes: (state, action: PayloadAction<string[]>) => {
      state.filters.sizes = action.payload;
    },
    setDressStyle: (state, action: PayloadAction<string | null>) => {
      state.filters.dressStyle = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<any[]>) => {
      state.filteredProducts = action.payload;
      state.isFiltered = true;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredProducts = [];
      state.isFiltered = false;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.isFiltered = false;
    },
  },
});

export const {
  setCategory,
  setColors,
  setPriceRange,
  setSizes,
  setDressStyle,
  setFilteredProducts,
  clearFilters,
  resetFilters,
} = shopSlice.actions;

export default shopSlice.reducer;
