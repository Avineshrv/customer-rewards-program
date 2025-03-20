import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px auto;
  padding: 0 16px;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  background: var(--table-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;

  th,
  td {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid var(--table-border);
  }

  th {
    background-color: var(--primary-color);
    color: #fff;
    font-weight: 500;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

export const FilterLabel = styled.label`
  font-size: 1rem;
  margin-right: 1rem;
  color: var(--text-color);
`;

export const FilterSelect = styled.select`
  padding: 8px 40px 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 1rem;
  color: var(--text-color);
  margin-right: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='70,100 30,40 110,40' fill='%23666'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 3px var(--primary-color);
  }
`;
