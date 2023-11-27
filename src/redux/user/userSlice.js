import {  createSlice } from "@reduxjs/toolkit";


 const initialState = {
    currentUser:null,
    error: null,
    loading:false
 }

 const userSlice = createSlice ({
    name:'user ',
    initialState, 
    reducers:{
        signInStart:(state)=>{
         state.loading=true ;
        },
        signInSucess:(state,action)=>{
         state.currentUser= action.payload;
         state.loading=false,
         state.loading= false 
        },
        signInFailure:(state,payload)=>{
         state.error = action.payload,
         state.loading=false
        }
    }
 });

 export const {signInFailure, signInStart, signInSucess} = userSlice.actions;
 export default userSlice.reducer;