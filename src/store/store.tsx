import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './Errors'
import employeeReducer from './Employees'

export const globalStore = configureStore({
    reducer: {
        ERRORS: errorReducer,
        EMPLOYEES: employeeReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof globalStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof globalStore.dispatch