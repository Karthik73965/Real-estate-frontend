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
        signInSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
         state.error = null;
       },
        signInFailure:(state,action)=>{
         state.error = action.payload,
         state.loading=false
        },
        updateUserStart:(state)=>{
         state.loading=true
        },
       updateUserSuccess:(state,action)=>{
         state.currentUser=action.payload,
         state.loading=false,
         state.error=null
       },
       updateUserfailure:(state,action)=>{
         state.error=action.error,
         state.loading=false
       },
       deleteUserStart:(state)=>{
         state.loading=true
        },
       deleteUserSuccess:(state,action)=>{
         state.currentUser=null,
         state.loading=false,
         state.error=null
       },
       deleteUserfailure:(state,action)=>{
         state.error=action.error,
         state.loading=false
       },
      SignOutUserStart :(state)=>{
         state.loading=true
        },
        SignOutUserSuccess:(state,action)=>{
         state.currentUser=null,
         state.loading=false,
         state.error=null
       },
       SignOutUserfailure:(state,action)=>{
         state.error=action.error,
         state.loading=false
       },
    }
 });

 export const { signInFailure, signInStart, signInSuccess,updateUserStart,updateUserSuccess, updateUserfailure,deleteUserfailure,deleteUserSuccess,deleteUserStart,SignOutUserfailure,SignOutUserStart,SignOutUserSuccess} = userSlice.actions;

 export default userSlice.reducer;