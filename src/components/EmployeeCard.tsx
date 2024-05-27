'use client'

import { Container, Stack, Typography, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { Employee } from '@/models/employee';
import { ConfirmModal } from './ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { push } from '@/store/Errors';
import { useDispatch } from 'react-redux';

interface employeeProp {
    employee : Employee
}

const EmployeeCard: FC<employeeProp> = ({employee}) => {

    const modalState = useState(false)
    const dispatch = useDispatch()


    function deleteEmployeeHandler() {
        try {
            console.log('deleting employee')
            modalState[1](true)
        } catch (error) {
            dispatch(push('Woo failed deleting employee'))
        }
    }


    return (
        <Container
            sx={{
            display : 'flex',
            bgcolor : '#EAEAEA',
            height : '76px',
            width : '321px',
            alignItems : 'center',
            justifyContent : 'space-between',
        }}>
            <Stack 
                direction='column'
                spacing={-1}
                >
                <Typography variant='h5' fontWeight={700} sx={{color : '#365271'}}>
                    {employee.name}
                </Typography>
                
                <Typography variant='subtitle1' sx={{color : '#365271'}}>
                    {employee.department.name}
                </Typography>

                <Typography variant='subtitle1' sx={{color : '#365271'}}>
                    {`$${employee.salary.toLocaleString()}`}
                </Typography>
            </Stack>

            <Stack
                direction='row'
                >
                <IconButton onClick={deleteEmployeeHandler}>
                    <DeleteIcon htmlColor='#E50000'/>
                </IconButton>

                <IconButton href={`/profile/${employee.id}`}>
                    <EditIcon htmlColor='#FFC32E'/>
                </IconButton>
            </Stack>

            <ConfirmModal id={employee.id} openState={modalState} />

        </Container>
    )
}

export default EmployeeCard