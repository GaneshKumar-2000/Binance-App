import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ticker: localStorage.getItem("ticker") ? localStorage.getItem("ticker") : "BTCUSDT",
    time: localStorage.getItem("time") ? localStorage.getItem("time") : "1m"
};

const chartStore = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setTicker(state, action) {
            state.ticker = action.payload
            localStorage.setItem("ticker", action.payload)
        },
        setTime(state, action) {
            state.time = action.payload
            localStorage.setItem("time", action.payload)
        }

    },
});

export const { setTicker, setTime } = chartStore.actions;
export default chartStore.reducer;
