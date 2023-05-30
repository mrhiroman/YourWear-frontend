import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import customizer from './customizer/slice'
import user from './user/slice'

export const store = configureStore({
    reducer: {
        customizer,
        user
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()