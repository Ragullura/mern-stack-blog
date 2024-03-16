import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    error:null,
    loading:false
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action) =>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },

    },

});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateStart,
    updateSuccess,
    updateFailure,}=userSlice.actions;

// The value we returned from reduceReducers is the combined reducer function that Redux Toolkit created for us. We can use

export default userSlice.reducer; //we can change this to  any other name if we want like (userReducer)