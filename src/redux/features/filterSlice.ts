import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Filter } from '@/app/types/Filter';

const filterInitialState: Filter = {
  page: 1,
  size: 10,
  search: '',
  min_salary: 0,
  max_salary: 0,
  level: '',
  sort_field: '',
  sort_direction: ''
};

const initialState = {
  filter: filterInitialState
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    }
  }
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
