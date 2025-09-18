'use client'
import css from './NoteDetails.module.css'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getSingleNote } from '@/lib/api'

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>()
    
    const {data, isLoading, isError,} = useQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id),
        refetchOnMount: false
    })
 
    return (
        <div className={css.container}>
            {isLoading ? (<p>Loading, please wait...</p>
            ) : isError || !data ? (<p>Something went wrong.</p>
            ) :
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data?.title}</h2>
                    </div>
                    <p className={css.content}>{data?.content}</p>
                    <p className={css.date}>{data?.createdAt}</p>
                </div> }
</div > 
    )
}

export default NoteDetailsClient