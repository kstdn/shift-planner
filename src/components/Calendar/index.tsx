import { HeaderRender } from 'antd/es/calendar/generateCalendar';
import locale from 'antd/es/date-picker/locale/en_GB';
import { getShifts } from 'api/modules/workplaces';
import { ShiftDto } from 'api/modules/workplaces/dto/shift.dto';
import { MessageContext } from 'context/MessageContext';
import {
  add,
  format,
  isSameDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  sub
} from 'date-fns';
import { addWeeks } from 'date-fns/esm';
import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Loader } from 'shared/components/Loader';
import { PageError } from 'shared/components/PageError';
import PositionVisualiser from 'shared/components/PositionVisualiser';
import { Status } from 'util/status';
import AntCalendar from './AntCalendar';
import InsertModal from './InsertModal';
import * as Styled from './styled';

function dateCellRender(value: Date, shifts: ShiftDto[]) {
  return (
    <Styled.CalendarCell>
      <Styled.CalendarCellDate>
        {new Date(value).getDate()}
      </Styled.CalendarCellDate>
      {shifts.map(shift => (
        <Styled.CalendarCellInner key={shift.id}>
          <PositionVisualiser
            noBackground
            fillContainer
            position={shift.shiftType.position}
            color={shift.shiftType.backgroundColor}
          />
        </Styled.CalendarCellInner>
      ))}
    </Styled.CalendarCell>
  );
}

const headerRender: HeaderRender<Date> = ({ value, onChange }) => {
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

export const Calendar = () => {
  const [status, setStatus] = useState(Status.Idle);
  const [shifts, setShifts] = useState<ShiftDto[]>([]);

  const [insertModalVisible, setInsertModalVisible] = useState(false);

  const { setMessage } = useContext(MessageContext);

  const getFirstVisibleDate = () => {
    const today = startOfToday();
    const startOfCurrentMonth = startOfMonth(today);
    return startOfWeek(startOfCurrentMonth, { weekStartsOn: 1 });
  };

  const getLastVisibleDate = () => {
    const firstVisibleDate = getFirstVisibleDate();
    return addWeeks(firstVisibleDate, 6);
  };

  useEffect(() => {
    setStatus(Status.Loading);
    getShifts(getFirstVisibleDate(), getLastVisibleDate())
      .then(result => {
        setShifts(result);
        setStatus(Status.Resolved);
      })
      .catch(error => {
        setStatus(Status.Rejected);
      });
  }, []);

  const getShiftsForDate = (date: Date) => {
    return shifts.filter(shift => isSameDay(date, new Date(shift.startDate)));
  };

  const onSelect = (value: Date) => {
    setInsertModalVisible(true);
  };

  const insertConfirmed = () => {
    setInsertModalVisible(false);
    console.log('Inserted!');
  }

  return (
    <>
      {status === Status.Loading && <Loader />}
      {status === Status.Rejected && <PageError />}
      {status === Status.Resolved && (
        <AntCalendar
          locale={locale}
          dateFullCellRender={value =>
            dateCellRender(value, getShiftsForDate(value))
          }
          headerRender={headerRender}
          onSelect={onSelect}
        />
      )}
      {insertModalVisible && (
        <InsertModal visible={insertModalVisible} insertConfirmed={insertConfirmed} insertCanceled={() => setInsertModalVisible(false)} />
      )}
    </>
  );
};
