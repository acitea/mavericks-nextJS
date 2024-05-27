import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { NotificationMessage } from '@/models/notification'


export interface ErrorState {
    errors: NotificationMessage[]
}

const initialState : ErrorState = {
    errors : []
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        push: (state, action: PayloadAction<string>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.errors.push({ key : action.payload, message: action.payload })
        },
        pop: (state) => {
            state.errors.pop()
        }
    },
})

export const { pop, push } = errorSlice.actions

export default errorSlice.reducer