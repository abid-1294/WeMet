import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo')) : null,
    },
    reducers: {
        userLoginInfo: (state, action) => {
            state.userInfo = action.payload;
            console.log(state, action);
        },
    },
})

// Action creators are generated for each case reducer function
export const {userLoginInfo} = userSlice.actions

export default userSlice.reducer