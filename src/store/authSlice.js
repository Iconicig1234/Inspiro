//store: it is a data storage unit it stores all the info at centralised place

//reducers: they are almost like controllers, all the actions such as (add, update, delete in the store) are done using reducers

//useSelectors: it can directly intract with the store
//we use selector when we want a selective info from the store

//useDispatch: when we want to update an selective thing in our store then we use diaptch
//dispath calls the reducer which then updates the store as we want

//slice is reposible for tracking initial state of the store
//and all the reducers are also collected here.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //as soon as you create a method in the reducers you have already an 
        //access to state and actions
        //state: it is the current state that what the store is dipicting right now
        //action: when you want to access the reducers, you use action to reach it out, so that you can provide payload or more

        //after logging in, you hit the api get the data you are 100% sure that you re logged in 
        //then you reach out to this reducer and set status = true and set userData
        //now this get stored into the global store - and now anyone with the access to store can read what you updated for user 
        login: (state, action) => {
            //so if a user is logged in then its status will be updated
            state.status = true
            //and the person will also provide us the data / payload
            state.userData = action.payload.userData
        },

        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer




