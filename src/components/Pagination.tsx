'use client'

import { Button, Container, List, Stack, SxProps } from "@mui/material";
import usePagination from "@mui/material/usePagination";

interface PaginationProps {
    pages : number,
    current : number,
    total : number
}

const buttonStyle : SxProps = {
    borderRadius: '3px',
    bgcolor : 'white',
    fontWeight : 700,
    color : '#365271',
    '&:disabled' : {
        color : '#B2B7BD'
    },
    '&:hover' : {
        color: '#365271',
        textDecorationLine : 'underline',
        bgcolor : '#E1E1E1;'
    }
}

// This technically doesn't need any client side interactions, but usePagination is not behaving
export function Pagination({pages, current, total} : PaginationProps) {

    const { items } = usePagination({
        count : pages,
        siblingCount : 1,
        page : current
    });

    const min = (current - 1) * 10 + 1
    const max = Math.min(current * 10, total)

    return (
    <nav>

        <Stack direction={'row'} sx={{
            justifyContent : 'space-between'
        }}>

            <Container sx={{
                color : '#365271'
            }}>

                Showing {`${min} - ${max}`} out of {total} entries
            </Container>



        <List sx={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
        }}>
        {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            switch (type) {
                case 'next':
                    let next = current + 1
                    children = (
                        <Button href={`?page=${next}`} {...item} sx={buttonStyle}>
                        {type}
                        </Button>
                    )
                    break;

                case 'previous':
                    let prev = current - 1
                    children = (
                        <Button href={`?page=${prev}`} {...item} sx={buttonStyle}>
                        {type}
                        </Button>
                    )
                    break;

                default:
                    if (index == current) {
                        children = (
                            <Button
                            {...item}
                            href={`?page=${page}`}
                            sx={{...buttonStyle, pointerEvents : 'none'}}
                            >
                            {page}
                            </Button>
                        )
                    }
                    break;
            }


            return <li key={index}>{children}</li>;
        })}
        </List>


        </Stack>

    </nav>
    )
}