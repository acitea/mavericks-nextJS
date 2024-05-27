'use server'
import { cookies } from 'next/headers'
import { Employee } from "@/models/employee"
import { z } from "zod"
import { redirect } from 'next/navigation'
const apiUrl = 'http://localhost:8080'

interface ApiResult {
    status : number,
    data : any,
    meta? : object
}

const NewEmployee = Employee.omit({id : true, department : true}).extend({
    department : z.string()
})

type NewEmployee = z.infer<typeof NewEmployee>

export type AsyncFunction = (employeeDetails : Employee) => Promise<ApiResult>

export type loginDetails = {
    username : string,
    password : string,
    role? : string
}

function fetchWrapper(url:string, options:any) : Promise<ApiResult> {
    const authorization = `Bearer ${cookies().get('jwt')?.value}`
    return fetch(url, {...options, headers : {
        ...options.headers,
        authorization
    }}).then( res => {

        if (res.status == 401 || res.status == 403) {
            redirect('/')
        }

        if (res.status == 204) {
            return {
                status : res.status,
                data : "Deleted"
            }
        }

        return res.json().then( json => {

            return json.data ? {
                status : res.status,
                data : json.data,
                meta : json.meta
            } : {
                status : res.status,
                data : json
            }

        }).catch( err => {
            console.log('CB IM IN ERROR BLOCK???')
            console.error(err)
            return {
                status : res.status,
                data : 'fuck'
            }
        })
    })
}

export async function login(details :loginDetails) {
    console.log('loggin in with:', details)

    const data = await fetchWrapper(`${apiUrl}/auth/login`, { cache: 'no-store', method : 'POST', body : JSON.stringify(details), headers : {
        'Content-Type' : 'application/json'
    }})

    cookies().set('jwt', data.data.token, { httpOnly : true })

    return data
}

export async function register(details :loginDetails) {
    const data = await fetchWrapper(`${apiUrl}/auth/register`, { cache: 'no-store', method : 'POST', body : JSON.stringify(details), headers : {
        'Content-Type' : 'application/json'
    }})
    return data
}

export async function fetchEmployees(page : number = 1, limit : number = 10 , authorization : string | null | undefined = undefined ) {
    const data = await fetchWrapper(`${apiUrl}/employee?page=${page}&limit=${limit}`, { cache: 'no-store' })
    return data
}

export async function fetchOneEmployee(id : string, authorization : string | null | undefined = undefined ) {
    const data = await fetchWrapper(`${apiUrl}/employee/${id}`, { cache: 'no-store' })
    return data
}


export async function editEmployee(employeeDetails : Employee, authorization : string | null | undefined = undefined ) {
    const data = await fetchWrapper(`${apiUrl}/employee/${employeeDetails.id}`, { cache: 'no-store', method : 'PUT', body : JSON.stringify(employeeDetails), headers : {
        'Content-Type' : 'application/json'
    }})
    return data
}

export async function deleteEmployee(id : number, authorization : string | null | undefined = undefined ) {
    const data = await fetchWrapper(`${apiUrl}/employee/${id}`, { cache: 'no-store', method : 'DELETE'})
    return data
}


export async function createEmployee(employeeDetails : NewEmployee, authorization : string | null | undefined = undefined ) {
    const data = await fetchWrapper(`${apiUrl}/employee`, { cache: 'no-store', method : 'POST', body : JSON.stringify(employeeDetails), headers : {
        'Content-Type' : 'application/json'
    }})
    return data
}