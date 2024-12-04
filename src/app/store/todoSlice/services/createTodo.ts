import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITodo } from "../../../../components/TodoItem";
import { IAsyncThunkConfig } from "../../types";
import { tableAction } from "../../tableSlice/slice/tableSlice";

export const createTodo = createAsyncThunk<ITodo, { completed: boolean, title: string, userId: number }, IAsyncThunkConfig>(
    'todos/creating',
    async ({ completed, title, userId }, thinkApi) => {
        const { rejectWithValue, dispatch } = thinkApi;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    completed,
                    userId
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const data: ITodo = await response.json();
            dispatch(tableAction.addTodo(data));

            return data;
        } catch (ex) {
            const error = new Error(ex as string);
            return rejectWithValue(error.message);
        }
    },
);
