import { configureStore } from '@reduxjs/toolkit'
import { tableReducer } from './tableSlice/slice/tableSlice'
import { todoReducer } from './todoSlice/slice/todoSlice'

export const store = configureStore({
    reducer: {
        table: tableReducer,
        todo: todoReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
