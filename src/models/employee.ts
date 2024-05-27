import { z } from "zod"

export const Department = z.object({
    id : z.coerce.number().optional(),
    name : z.enum(['HR', 'PS'])
}) 

export const Employee = z.object({
    id : z.coerce.number(),
    name : z.string(),
    salary : z.coerce.number(),
    department : Department
})

export type Employee = z.infer<typeof Employee>