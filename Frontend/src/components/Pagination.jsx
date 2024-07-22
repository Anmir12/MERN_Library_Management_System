import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({
  totalBooks,
  booksPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default Pagination;
