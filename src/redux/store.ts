import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import customizer from './customizer/slice'
import user from './user/slice'
import wears from './wears/slice'

export const store = configureStore({
    reducer: {
        customizer,
        user,
        wears
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()