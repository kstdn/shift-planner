import locale from 'antd/es/date-picker/locale/en_GB';
import { getShifts, createShift } from 'api/modules/workplaces';
import { ShiftDto } from 'api/modules/workplaces/dto/shift.dto';
import { MessageContext } from 'context/MessageContext';
import { InsertModeContext } from 'context/InsertModeContext';
import { isSameDay, startOfMonth, startOfToday, startOfWeek } from 'date-fns';
import { addWeeks } from 'date-fns/esm';
import React, { useContext, useEffect, useState } from 'react';
import { Loader } from 'shared/components/Loader';
import { PageError } from 'shared/components/PageError';
import { Status } from 'util/status';
import AntCalendar from './AntCalendar';
import { DateCell } from './DateCell';
import { HeaderCell } from './HeaderCell';
import InsertModal from './InsertModal';

export const Calendar = () => {
  const [status, setStatus] = useState(Status.Idle);
  const [shifts, setShifts] = useState<ShiftDto[]>([]);

  const { insertModeActive, insertModalVisible, setInsertModalVisible, insertDate, setInsertDate } = useContext(InsertModeContext);
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
    if (insertModeActive) {
      setInsertDate(value);
      setInsertModalVisible(true);
    } else {
    }
  };

  const onInsertSuccess = (shift: ShiftDto) => {
    setShifts(prev => [...prev, shift]);
  };

  return (
    <>
      {status === Status.Loading && <Loader />}
      {status === Status.Rejected && <PageError />}
      {status === Status.Resolved && (
        <AntCalendar
          locale={locale}
          dateFullCellRender={value => (
            <DateCell value={value} shifts={getShiftsForDate(value)} />
          )}
          headerRender={HeaderCell}
          onSelect={onSelect}
        />
      )}
      {insertModalVisible && (
        <InsertModal onInsertSuccess={shift => onInsertSuccess(shift)}/>
      )}
    </>
  );
};
