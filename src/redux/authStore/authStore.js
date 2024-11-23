import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    user: null,
    token: null,
};

const authStore = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { email, token } = action.payload;
            state.isLogged = true;
            state.user = email;
            state.token = token;
            localStorage.setItem('token', token);
            localStorage.setItem('usermail', email);
            localStorage.setItem('isLogged', "true");
            localStorage.setItem('tab', "chart");
            localStorage.setItem('sort', "false");
        },
        logout(state) {
            state.isLogged = false;
            state.user = null;
            state.token = null;
            localStorage.clear()
        },
    },
});

export const { login, logout } = authStore.actions;
export default authStore.reducer;
