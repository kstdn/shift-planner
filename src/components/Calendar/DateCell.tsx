import { ShiftDto } from 'api/modules/workplaces/dto/shift.dto';
import React from 'react';
import PositionVisualiser from 'shared/components/PositionVisualiser';
import * as Styled from './styled';

type Props = {
  value: Date;
  shifts: ShiftDto[];
};

export const DateCell = ({ value, shifts }: Props) => {
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
