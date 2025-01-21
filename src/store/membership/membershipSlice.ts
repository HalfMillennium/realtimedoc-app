import { createSlice } from "@reduxjs/toolkit";

export enum MembershipType {
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM",
}

export const membershipSlice = createSlice({
    name: "membership",
    initialState: {
        currentUserMembership: MembershipType.BASIC,
    },
    reducers: {
        updateMembership: (state, action) => {
            state.currentUserMembership = action.payload.newMembership;
        }
    }
});

export const membershipReducer = membershipSlice.reducer;

export const { updateMembership } = membershipSlice.actions;
