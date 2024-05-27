'use client'

import { Paper, Typography, Button, Modal, Stack } from "@mui/material"
import { FC, Dispatch, SetStateAction } from "react";
import { deleteEmployee } from "@/lib/api/employee";
import { push } from '@/store/Errors';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";

type DeleteState = {
    id : number,
    openState : [boolean, Dispatch<SetStateAction<boolean>>]
}

export const ConfirmModal : FC<DeleteState> = ({id, openState}) => {
    const router = useRouter()
    const [open, setOpen] = openState
    const handleClose = () => setOpen(false)
    const dispatch = useDispatch()
    function deleteEmployeeWithId() {
        handleClose()
        deleteEmployee.bind(null, id)().then( res => {
            dispatch(push('Delete Success!'))
            router.refresh()
        }).catch( err => {
            dispatch(push('Error Deleting!'))
        })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Paper elevation={3}
                sx={{
                    position : 'absolute',
                    top : '50%',
                    left : '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    padding : 2
                }}
            >
                <Typography variant="h4" margin={2} marginTop={0} fontWeight={700}>
                    Are you sure?
                </Typography>

                <Stack
                    direction='row'
                    gap={2}
                    sx={{
                        float : 'right'
                    }}
                >
                    <Button variant="outlined" onClick={deleteEmployeeWithId}>Delete</Button>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                </Stack>
            </Paper>
        </Modal>
    )
}