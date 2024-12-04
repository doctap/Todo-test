import { RootState } from '../../../index';

export const getTodo = (state: RootState) => state.todo.data;
