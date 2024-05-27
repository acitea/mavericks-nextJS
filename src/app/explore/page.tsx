import { Suspense } from "react";
import EmployeeBoard from "@/components/EmployeeBoard";
import AppBar from "@/components/AppBar";
import { fetchEmployees } from "@/lib/api/employee";
import { PaginationMeta } from "@/components/EmployeeBoard";


export default async function Home({searchParams} : any) {

    let { status, ...response } = await fetchEmployees(Number(searchParams.page ?? 1), 10)
    let { data, meta } = response as PaginationMeta

    return (
        <>

        <AppBar />

        <Suspense>
            <EmployeeBoard data={data} meta={meta} />
        </Suspense>

        </>
    );
}
