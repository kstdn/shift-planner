import styled from 'styled-components';

export const CalendarHeader = styled.div`
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CalendarCell = styled.div`
  height: 100%;

  border-style: solid;
  border-color: var(--bg-secondary);
  border-width: 0;
  border-top-width: 1px;

  td:not(:last-of-type) & {
    border-right-width: 1px;
  }

  tr:last-of-type & {
    border-bottom-width: 1px;
  }
`;

export const CalendarCellDate = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  line-height: 1rem;
  z-index: 1;
`;

export const CalendarCellInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;