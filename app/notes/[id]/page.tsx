import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetailes.client";
import {dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
    params: Promise<{id:string}>
}

const NoteDetailes = async ({params}: Props) => {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id)
    })
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
            </HydrationBoundary>
    );
}

export default NoteDetailes