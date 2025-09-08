import { fetchNotes } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

const NotesPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes'],
        queryFn: () => fetchNotes({ query: '', page: 1 })
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient/>
        </HydrationBoundary>
    )
}

export default NotesPage