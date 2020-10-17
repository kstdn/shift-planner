import { HeaderRender } from 'antd/lib/calendar/generateCalendar';
import { add, format, sub } from 'date-fns';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import * as Styled from './styled';

export const HeaderCell: HeaderRender<Date> = ({ value, onChange }) => {
  return (
    <Styled.CalendarHeader>
      <ChevronLeft
        onClick={() => onChange(sub(value, { months: 1 }))}
      ></ChevronLeft>
      <div>{format(value, 'MMMM')}</div>
      <ChevronRight
        onClick={() => onChange(add(value, { months: 1 }))}
      ></ChevronRight>
    </Styled.CalendarHeader>
  );
};
