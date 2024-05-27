import { Typography, Button, Container } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AppBar() {

    return (
        <Container maxWidth={false} sx={{
            minWidth : '100vw',
            display : 'flex',
            position : 'sticky',
            top : '0',
            justifyContent : 'space-between',
            alignItems : 'center',
            bgcolor : '#365271',
            py : 2,
            zIndex : 5
        }}>
            

            <Typography
            variant="h4"
            noWrap
            component="h4"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            fontWeight={700}
            >
            Employee
            </Typography>


            <AddCircleIcon fontSize='large' href='/profile/new' sx={{
                display : {
                    md : 'none'
                }
            }} />


            <Button variant="contained" startIcon={
                <AddCircleIcon/>
                }
                href='/profile/new'
                sx={{
                    bgcolor : '#34933B',
                    "&:hover" : {
                    bgcolor : '#2f8435',
                    cursor : 'pointer'
                    },
                    display : {
                        xs : 'none',
                        md : 'inherit'
                    }
                }}
                >
                Add Employee
            </Button>
        </Container>

    )
}