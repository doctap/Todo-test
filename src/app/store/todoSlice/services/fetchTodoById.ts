import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITodo } from "../../../../components/TodoItem";
import { IAsyncThunkConfig } from "../../types";
import { tableAction } from "../../tableSlice/slice/tableSlice";

export const fetchTodoById = createAsyncThunk<ITodo, number, IAsyncThunkConfig>(
    'todoById/fetching',
    async (todoId, thunkApi) => {

        const { dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
            const data: ITodo = await response.json();
            dispatch(tableAction.setCurrentTodo(todoId));

            return data;
        } catch (ex) {
            const error = new Error(ex as string);
            return rejectWithValue(error.message);
        }
    },
);
