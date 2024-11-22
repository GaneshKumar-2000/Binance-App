import { createSlice } from '@reduxjs/toolkit';

const date = new Date();
const initialState = {
    tableTicker: localStorage.getItem("tableTicker") ? localStorage.getItem("tableTicker") : "BTCUSDT",
    tableTime: localStorage.getItem("tableTime") ? localStorage.getItem("tableTime") : "1m",
    startDate: localStorage.getItem("startDate") ? Number(localStorage.getItem("startDate")) : date.getTime(),
    endDate: localStorage.getItem("endDate") ? Number(localStorage.getItem("endDate")) : date.getTime(),
    limit: localStorage.getItem("limit") ? Number(localStorage.getItem("limit")) : 50,
};

const tableStore = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableTicker(state, action) {
            state.tableTicker = action.payload
            localStorage.setItem("tableTicker", action.payload)
        },
        setTableTime(state, action) {
            state.tableTime = action.payload
            localStorage.setItem("tableTime", action.payload)
        },
        setStartDate(state, action) {
            state.startDate = action.payload
            localStorage.setItem("startDate", action.payload)
        },
        setEndDate(state, action) {
            state.endDate = action.payload
            localStorage.setItem("endDate", action.payload)
        },
        setLimit(state, action) {
            state.limit = action.payload
            localStorage.setItem("limit", action.payload)
        }
    },
});

export const { setTableTicker, setTableTime, setStartDate, setEndDate, setLimit } = tableStore.actions;
export default tableStore.reducer;
