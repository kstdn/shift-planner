import React, { useContext } from 'react';
import AntCalendar from './AntCalendar';
import { HeaderRender } from 'antd/es/calendar/generateCalendar';
import locale from 'antd/es/date-picker/locale/en_GB';
import config from 'rc-picker/lib/generate/dateFns';
import { format, add, sub } from 'date-fns';

import * as Styled from './styled';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { MessageContext } from 'context/MessageContext';

function dateCellRender(value: Date) {
  return (
    <Styled.CalendarCell>{config.getDate(value)}</Styled.CalendarCell>
  );
}

function getMonthData(value: Date) {
  if (value.getMonth() === 8) {
    return 1394;
  }
}

// const onChange = (value: Date) => {
//   console.log(value);
// }

const headerRender: HeaderRender<Date> = ({value, onChange}) => {
return <Styled.CalendarHeader>
    <ChevronLeft onClick={() => onChange(sub(value, { months: 1 }))}></ChevronLeft>
    <div>{format(value, 'MMMM')}</div>
    <ChevronRight onClick={() => onChange(add(value, { months: 1 }))}></ChevronRight>
  </Styled.CalendarHeader>;
}

export const Calendar = () => {
  const { setMessage } = useContext(MessageContext);

  const onChange = (value: Date) => {
    setMessage(value.toUTCString())
  }

  return (<AntCalendar
    locale={locale}
    dateFullCellRender={dateCellRender}
    headerRender={headerRender}
    onChange={onChange}
  />)
};
