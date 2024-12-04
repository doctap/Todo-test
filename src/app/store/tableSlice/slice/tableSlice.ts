import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../../../../components/TodoItem'
import { fetchTodos } from '../services/fetchTodos'
import { ISchema } from '../../types'

export type TableActionType = {
    completed?: boolean
}

export interface TableState extends ISchema<ITodo[]> {
    todos: ITodo[]
    currentUsebleTodo?: ITodo
}

const initialState: TableState = {
    data: [],
    todos: [],
    isLoading: false,
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        filterBy: (state, action: PayloadAction<TableActionType>) => {
            if (typeof action.payload.completed === 'boolean') {
                state.todos = state.data.filter(elem => elem.completed === action.payload.completed);
            } else {
                state.todos = state.data
            }
        },
        setCurrentTodo: (state, action: PayloadAction<number | ITodo>) => {
            if (typeof action.payload === 'number') {
                state.currentUsebleTodo = state.todos.find(elem => elem.id === action.payload);
            } else {
                state.currentUsebleTodo = action.payload;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter(elem => elem.id !== action.payload);
            state.todos = state.todos.filter(elem => elem.id !== action.payload);
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.data = [action.payload, ...state.data];
            state.todos = [action.payload, ...state.todos];
        },
        updateTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos = state.todos.reduce<ITodo[]>((s, t) => {
                const todo = action.payload;
                if (t.id === todo.id) {
                    s.push({ ...t, ...todo });
                } else {
                    s.push(t);
                }

                return s;
            }, []);
            state.data = state.data.reduce<ITodo[]>((s, t) => {
                const todo = action.payload;
                if (t.id === todo.id) {
                    s.push({ ...t, ...todo });
                } else {
                    s.push(t);
                }

                return s;
            }, []);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.isLoading = false;
            state.error = undefined;
        })
        builder.addCase(fetchTodos.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
        builder.addCase(fetchTodos.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
    },
})

export const { actions: tableAction } = tableSlice;
export const { reducer: tableReducer } = tableSlice;
