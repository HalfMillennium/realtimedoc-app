import { createSlice } from '@reduxjs/toolkit';

export interface Dataset {
  id: string;
  label: string;
}

export const datasetsSlice = createSlice({
    name: 'counter',
    initialState: {
        selectedDatasetId: undefined,
    },
    reducers: {
        selectDataset: (state, action) => {
            state.selectedDatasetId = action.payload.datasetId;
        },
        deselectAllDatasets: (state, action) => {
            state.selectedDatasetId = action.payload.datasetId;
        }
    },
});

export const { selectDataset, deselectAllDatasets } = datasetsSlice.actions;

// Action creators are generated for each case reducer function
export default datasetsSlice.reducer;
