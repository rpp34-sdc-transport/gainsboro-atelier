import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: inline-block;
`;

const Select = styled.select`
  border: 0;
`;

export default function SortMenu({handleSortOptionChange}) {
  return(
    <Form>
      <Select onChange={handleSortOptionChange}>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </Select>
    </Form>
  )
}