import { RootState } from '../../../index';

export const getTodos = (state: RootState) => state.table.todos;
