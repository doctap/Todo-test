import { RootState } from '../../../index';

export const getLoading = (state: RootState) => state.todo.isLoading;
