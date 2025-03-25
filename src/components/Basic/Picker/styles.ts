import styled from 'styled-components'

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  background-color: white;
  color: #333;
  cursor: pointer;
  appearance: none; /* Removes the default arrow */
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><polygon points="2,0 0,5 4,5"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px 10px;

  &:focus {
    border-color: #007bff;
  }

  &:hover {
    border-color: #007bff;
  }
`
