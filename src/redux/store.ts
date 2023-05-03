import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import customizer from './customizer/slice'

export const store = configureStore({
    reducer: {
        customizer
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()