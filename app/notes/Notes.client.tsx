'use client'

import SearchBox from "@/components/SearchBox/SearchBox"
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList"
import { fetchNotes } from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from 'use-debounce';
import { useState } from "react";
import css from './Notes.module.css'
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import ErrorRequest from "@/components/ErrorRequest/ErrorRequest";
import NoteForm from "@/components/NoteForm/NoteForm";

function NotesClient() {

  const [inputValue, setinputValue] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {data, isSuccess, isLoading, isFetching, isError} = useQuery({
    queryKey: ['notes', inputValue, page],
      queryFn: () => fetchNotes({ query: inputValue, page: page }),
      refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback(
    (searchTopic: string) => {
      setinputValue(searchTopic);
      setPage(1);
    },
    300
  );

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={updateSearchQuery} />
     {isSuccess && totalPages > 0 &&  (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>Create +</button>
      </header>

      {isLoading || isFetching ? (
      <Loader />
    ) : isError ? (
      <ErrorMessage />
    ) : data && data.notes.length > 0 ? (
      <NoteList notes={data.notes} />
    ) : (
      <ErrorRequest />
    )}
      {isModalOpen && (
        <Modal onClose={closeModal} >
          <NoteForm onClose={closeModal}/>
        </Modal>
      )}
     
      </div>
  )
}

export default NotesClient




