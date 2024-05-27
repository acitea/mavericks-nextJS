'use client'

import { Snackbar, Button, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import type { RootState } from "@/store/store"
import { useSelector, useDispatch } from 'react-redux'
import { pop } from "@/store/Errors"

export function NotificationMessages() {

    const errors = useSelector((state: RootState) => state.ERRORS.errors)
    const error = errors.at(0)
    const dispatch = useDispatch()

    function handleClose() {
        dispatch(pop())
    }


    return (

        error &&
        <Snackbar
        anchorOrigin={{ vertical : 'top', horizontal : 'center' }}
        open={error ? true : false}
        message={error.message}
        key={error.key}
        action={
            <>
                <IconButton
                    aria-label="close"
                    color="inherit"
                    sx={{ p: 0.5 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </>
        }
        />

    )
}
