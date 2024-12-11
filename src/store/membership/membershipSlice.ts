import { createSlice } from "@reduxjs/toolkit";

export enum MEMBERSHIP_TYPES {
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM",
}

export const membershipSlice = createSlice({
    name: "membership",
    initialState: {
        currentUserMembership: MEMBERSHIP_TYPES.BASIC,
    },
    reducers: {
        updateMembership: (state, action) => {
            state.currentUserMembership = action.payload.newMembership;
        }
    }
});

export const membershipReducer = membershipSlice.reducer;

export const { updateMembership } = membershipSlice.actions;
