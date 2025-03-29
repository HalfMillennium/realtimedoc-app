import { createSlice } from '@reduxjs/toolkit';
import { SegmentMenuOptions } from '@/pages/home/menus/segment_menu';

export const homePageActivitySlice = createSlice({
  name: 'homePageActivity',
  initialState: {
    currentSegmentMenuOption: SegmentMenuOptions.HowItWorks,
  },
  reducers: {
    setCurrentSegmentMenuOption: (state, action) => {
      state.currentSegmentMenuOption = action.payload.menuOption;
    },
  },
});

export const { setCurrentSegmentMenuOption } = homePageActivitySlice.actions;
export const homePageActivityReducer = homePageActivitySlice.reducer;
