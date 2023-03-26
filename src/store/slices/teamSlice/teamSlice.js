import { createSlice } from '@reduxjs/toolkit';

export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        team: [], 
        isLoading: false,
    },
    reducers: {
            setTeam: (state, {payload}) => {
            state.team = payload;
        },
        isLoading: (state, {payload}) => {
            state.isLoading = payload;
        }

    }
});
export const { setTeam, isLoading} = teamSlice.actions;