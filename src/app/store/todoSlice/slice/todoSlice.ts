import { createSlice } from '@reduxjs/toolkit'
import { ITodo } from '../../../../components/TodoItem'
import { fetchTodoById } from '../services/fetchTodoById'
import { ISchema } from '../../types'
import { updatingTodo } from '../services/updateTodo'
import { createTodo } from '../services/createTodo'

const initialState: ISchema<ITodo> = {
    data: {
        id: -1,
        completed: false,
        title: '',
        userId: -1
    },
    isLoading: true,
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        resetTodoSlice: () => initialState
    },
    extraReducers: (builder) => {

        //fetchTodoById
        builder.addCase(fetchTodoById.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.isLoading = false;
            state.error = undefined;
        })
        builder.addCase(fetchTodoById.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        builder.addCase(fetchTodoById.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })

        //updatingTodo
        builder.addCase(updatingTodo.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.isLoading = false;
            state.error = undefined;
        })
        builder.addCase(updatingTodo.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        builder.addCase(updatingTodo.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })

        // createTodo
        builder.addCase(createTodo.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.isLoading = false;
            state.error = undefined;
        })
        builder.addCase(createTodo.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        builder.addCase(createTodo.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
    },
})

export const { actions: todoAction } = todoSlice;
export const { reducer: todoReducer } = todoSlice;
