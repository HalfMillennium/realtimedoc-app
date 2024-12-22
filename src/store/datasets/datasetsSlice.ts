import { createSlice } from '@reduxjs/toolkit';

export interface DataSetOption {
  id: string;
  title: string;
  subtitle: string;
}

export interface SupportedDataSet {
  label: string;
  id: string;
  options?: DataSetOption[];
}

const availableDataSets: SupportedDataSet[] = [
  { label: 'Financial Market News', id: 'financial' },
  {
    label: 'Economic Spending Data',
    id: 'spending',
    options: [
      {
        id: 'usaConsumerSpending',
        title: 'US Consumers',
        subtitle: 'Latest available macro-economic data for US-based consumers.',
      },
      {
        id: 'usaGovernmentSpending',
        title: 'US Government',
        subtitle: 'Latest available macro-economic data for the US government.',
      },
    ],
  },
];

export const datasetsSlice = createSlice({
  name: 'datasets',
  initialState: {
    availableDataSets: availableDataSets,
    selectedDataSetId: undefined,
  },
  reducers: {
    selectDataset: (state, action) => {
      state.selectedDataSetId = action.payload.datasetId;
    },
    deselectAllDatasets: (state) => {
      state.selectedDataSetId = undefined;
    },
  },
});

export const { selectDataset, deselectAllDatasets } = datasetsSlice.actions;

// Action creators are generated for each case reducer function
export const datasetsReducer = datasetsSlice.reducer;
