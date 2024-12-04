import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITodo } from "../../../../components/TodoItem";
import { IAsyncThunkConfig } from "../../types";
import { tableAction } from "../../tableSlice/slice/tableSlice";

export const updatingTodo = createAsyncThunk<ITodo, { completed?: boolean, title?: string, id: number }, IAsyncThunkConfig>(
    'todos/updateing',
    async (body, thinkApi) => {
        const { rejectWithValue, dispatch } = thinkApi;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${body.id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const data: ITodo = await response.json();
            dispatch(tableAction.setCurrentTodo(data));
            dispatch(tableAction.updateTodo(data));

            return data;
        } catch (ex) {
            const error = new Error(ex as string);
            return rejectWithValue(error.message);
        }
    },
);
