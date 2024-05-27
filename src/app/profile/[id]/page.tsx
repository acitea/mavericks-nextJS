'use client'

import { Container, TextField, Box, Menu, Button, MenuItem, List, ListItemText, ListItemButton } from "@mui/material"
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, MouseEvent, FormEvent, Dispatch, SetStateAction, useEffect } from "react"
import { fetchOneEmployee, createEmployee, editEmployee, AsyncFunction } from "@/lib/api/employee";
import { Employee } from "@/models/employee";
import { push } from "@/store/Errors";
import { useDispatch } from "react-redux";

enum departments {
    HR = 'HR',
    PS = 'PS',
}


export default function Profile({ params }: { params: { id: string } }) {

    const router = useRouter()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [nameValid, setNameValid] = useState(params.id != 'new')
    const [salary, setSalary] = useState(1000)
    const [salaryValid, setSalaryValid] = useState(true)
    const [department, setDepartment] = useState<'HR' | 'PS'>('HR');
    const [open, setOpen] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (params.id != 'new') {
            fetchOneEmployee(params.id).then( res => {
                console.log(res)
                let employee = res.data as Employee
                setName(employee.name)
                setSalary(employee.salary)
                setDepartment(employee.department.name)
            })
        }
    }, [params.id])


    function nameValidator(input:string) {
        return input.length >= 4 && input.length <= 30
    }

    function salaryValidator(input : number) {
        return input > 0
    }

    function changeValueHandler(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, valueSetter:Dispatch<SetStateAction<any>>, errorSetter:Dispatch<SetStateAction<any>>, validation:Function) {
        let value = e.target.value ?? ''
        valueSetter(value)
        errorSetter(validation(value))
    }

    const handleMenuItemClick = (
        event: MouseEvent<HTMLElement>,
        option: departments,
    ) => {
        setDepartment(departments[option]);
        setOpen(null);
    };


    function handleFormSubmit(e:FormEvent) {

        try {
            e.preventDefault();

            if (nameValid && salaryValid) {
                console.log('Form Submitted:', {
                    name,
                    salary,
                    department
                });

                let submission = null

                if (params.id == 'new') {
                    console.log('creating new emplouee')
                    submission = createEmployee({
                        name,
                        salary,
                        department
                    })
                } else {
                    submission = editEmployee({
                        id : Number(params.id),
                        name,
                        salary,
                        department : {name:department}
                    })
                }

                submission.then( res => {
                    switch (res.status) {
                        case 304:
                            dispatch(push('No change!'))
                            break;
                            
                            case 200:
                            dispatch(push('Success!'))
                            router.push('/explore')
                            break;
                    
                        default:
                            dispatch(push('Error: ' + res.data))
                            break;
                    }
                })

            } else {
                console.error('Wow fk validation i guess')
            }

        } catch (error) {
            dispatch(push('Failed saving Employee'))
        }

    }

    return (

        <Container sx={{
            mt : 4
        }}>

            <Button color="error" variant="contained" onClick={() => router.push('/explore')}>
                Back
            </Button>


            <Box component='form' onSubmit={handleFormSubmit}>

                <Container sx={{
                    display : 'flex',
                    alignItems : "center",
                    gap : 4
                }}>
                    <TextField variant="standard" 
                        name="name"
                        label="Name"
                        value={name}
                        onChange={e => changeValueHandler(e, setName, setNameValid, nameValidator)}
                        error={!nameValid}
                        helperText={!nameValid ? "Name must be 4 - 30 characters long" : ''}
                    />

                    <List
                        component="nav"
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        <ListItemButton
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => setOpen(event.currentTarget)}
                        >
                        <ListItemText
                            sx={{
                                color : '#365271'
                            }}
                            secondaryTypographyProps={{
                                fontWeight : 700,
                                sx : {
                                    opacity : 0.7
                                }
                            }}
                            primary="Department"
                            secondary={department}
                        />
                        </ListItemButton>
                    </List>
                    <Menu
                        anchorEl={open}
                        open={Boolean(open)}
                        onClose={() => setOpen(null)}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        {Object.keys(departments).map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={option === department}
                            onClick={(event) => handleMenuItemClick(event, option as departments)}
                        >
                            {option}
                        </MenuItem>
                        ))}
                    </Menu>


                </Container>

                <TextField variant="standard"
                    name="salary"
                    label="Salary"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={salary}
                    onChange={e => changeValueHandler(e, setSalary, setSalaryValid, salaryValidator)}
                    error={!salaryValid}
                    helperText={!salaryValid ? "Salary must be more than 0" : ''}
                    />


                <Button type="submit" color="success" variant="contained">
                    Save
                </Button>

            </Box>


        </Container>

    )
}