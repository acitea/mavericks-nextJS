import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Employee } from '@/models/employee'
import { createEmployee, fetchEmployees } from '@/lib/api/employee';

export interface EmployeeState {
    employees : {
        [key: string] : Employee
    };
}

const initialState : EmployeeState = {
    employees : {},
}



export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        retrieveAll: (state) => {
            fetchEmployees().then( res => {
                const employees = res.data as Employee[]
                state.employees = employees.reduce((obj, employee, ) => {
                        obj[String(employee.id)] = employee
                        return obj
                    }, {} as {
                        [key: string] : Employee
                    })
            })
        },
        edit: (state, action) => {
            state.employees[action.payload.id] = action.payload
        },
        create: (state, action) => {
            createEmployee(action.payload).then( res => {

                if (res.status >= 400) {
                    console.log('SHIT HAPPENED')
                }

                employeeSlice.caseReducers.retrieveAll(state)
            })
        }
    },
})

export const { retrieveAll, edit, create } = employeeSlice.actions

export default employeeSlice.reducer