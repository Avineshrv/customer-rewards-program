import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PAGINATION_TEXT } from '../constants';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#0056b3')};
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
