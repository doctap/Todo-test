import { RootState } from '../../../index';

export const getError = (state: RootState) => state.todo.error;
