import { RootState } from "../store"

export interface ISchema<T> {
    data: T
    isLoading: boolean
    error?: string
}

export interface IAsyncThunkConfig {
    rejectValue: string
    state: RootState
}
