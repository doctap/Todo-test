import { createAsyncThunk } from "@reduxjs/toolkit"
import { IAsyncThunkConfig } from "../../types";
import { tableAction } from "../../tableSlice/slice/tableSlice";

export const deleteTodoById = createAsyncThunk<unknown, number, IAsyncThunkConfig>(
    'todoById/deleting',
    async (todoId, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                dispatch(tableAction.deleteTodo(todoId));
            }
        } catch (ex) {
            const error = new Error(ex as string);
            return rejectWithValue(error.message);
        }
    },
);
