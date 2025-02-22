//store: it is a data storage unit it stores all the info at centralised place

//reducers: they are almost like controllers, all the actions such as (add, update, delete in the store) are done using reducers

//useSelectors: it can directly intract with the store
//we use selector when we want a selective info from the store

//useDispatch: when we want to update an selective thing in our store then we use diaptch
//dispath calls the reducer which then updates the store as we want

import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./authSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})

export default store