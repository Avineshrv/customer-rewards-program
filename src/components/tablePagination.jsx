import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PAGINATION_TEXT } from '../utils/constants';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {PAGINATION_TEXT.prev}
      </PageButton>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {PAGINATION_TEXT.next}
      </PageButton>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
