import { configureStore } from '@reduxjs/toolkit';
import auth from './authStore/authStore';
import chart from './chartStore/chartStore';
import table from './tableStore/tableStore';

const store = configureStore({
    reducer: {
        auth: auth,
        chart: chart,
        table: table
    }
})

export default store