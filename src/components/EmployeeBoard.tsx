import { Container } from '@mui/material';
import EmployeeCard from './EmployeeCard';
import { Employee } from "@/models/employee";
import { Pagination } from './Pagination';

export interface PaginationMeta {
    data : Employee[]
    meta : {
        totalEmployees : number
        totalPages : number
        currentPage : number
        limit : number
    }
}

export function EmployeeBoard({ data, meta } : PaginationMeta ) {

    return (
        <>
        <Container

        >

            <Container
                sx={{
                marginY : 4,
                display : 'grid',
                gridTemplateColumns : {
                    md : 'repeat(2, minmax(0, 1fr))'
                    
                },
                placeContent : 'space-around',
                gap : 4,
                minHeight : '80vh',
                }}>
                { data.map(emp => 
                    <EmployeeCard key={emp.id} employee={emp} />
                )}
            </Container>

        </Container>

        <Container sx={{
            display : 'flex',
            justifyContent : 'end',
            // outline : '1px red dashed'
        }}>

            {
                <Pagination total={meta.totalEmployees} pages={meta.totalPages} current={meta.currentPage} />
            }

        </Container>
        </>
    );
}


export default EmployeeBoard

