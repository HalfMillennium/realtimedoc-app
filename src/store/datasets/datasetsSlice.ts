import { createSlice } from '@reduxjs/toolkit';

export interface SupportedDataSet {
  /** Required for parent dataSet options */
  label?: string;
  id: string;
  /** Whether this is a child dataSet option or parent, independent dataSet option */ 
  isDataSetOption?: boolean;
  children?: string[];
  title?: string;
  subtitle?: string;
}

const availableDataSets: SupportedDataSet[] = [
  { label: 'Financial Market News', id: 'financial_news' },
  {
    label: 'Economic Spending Data',
    id: 'spending',
    children: ['us_consumer_spending', 'us_national_spending'],
  },
  {
    id: 'us_consumer_spending',
    title: 'US Consumers',
    subtitle: 'Latest available macro-economic data for US-based consumers.',
    isDataSetOption: true,
  },
  {
    id: 'us_national_spending',
    title: 'US Government',
    subtitle: 'Latest available macro-economic data for the US government.',
    isDataSetOption: true,
  },
];

export const dataSetsSlice = createSlice({
  name: 'dataSets',
  initialState: {
    availableDataSets: availableDataSets,
    selectedDataSetId: undefined,
  },
  reducers: {
    selectDataSet: (state, action) => {
      state.selectedDataSetId = action.payload.dataSetId;
    },
    deselectAllDataSets: (state) => {
      state.selectedDataSetId = undefined;
    },
  },
});

export const { selectDataSet, deselectAllDataSets } = dataSetsSlice.actions;

// Action creators are generated for each case reducer function
export const dataSetsReducer = dataSetsSlice.reducer;
