import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 0, initialSize = 10) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('asc');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const goToPage = useCallback((newPage) => {
    setPage(Math.max(0, newPage));
  }, []);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const changeSize = useCallback((newSize) => {
    setSize(newSize);
    setPage(0);
  }, []);

  const toggleSort = useCallback((field) => {
    setSort((prevSort) => {
      if (prevSort === field) {
        setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setDirection('asc');
      }
      return field;
    });
    setPage(0);
  }, []);

  const updateFromResponse = useCallback((response) => {
    if (response) {
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    }
  }, []);

  return {
    page, size, sort, direction, totalPages, totalElements,
    goToPage, nextPage, prevPage, changeSize, toggleSort,
    setTotalPages, setTotalElements, updateFromResponse,
  };
};
