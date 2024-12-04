import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITodo } from "../../../../components/TodoItem";

export const fetchTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>(
    'todos/fetching',
    async (_, { rejectWithValue }) => {

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');

            const data: ITodo[] = await response.json();

            return data;
        } catch (ex) {
            const error = new Error(ex as string);
            return rejectWithValue(error.message);
        }
    },
);
