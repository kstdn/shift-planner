import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';
import React from 'react';
import { useLocation } from 'react-router-dom';
import * as Styled from './styled';
import ShiftTypes from 'components/ShiftTypes';

const WorkplaceDetails = () => {
  const { state: workplace } = useLocation<WorkplaceDto>();

  return (
    <>
      <Styled.WorkplaceDetailsHeader>
        {workplace.name}
      </Styled.WorkplaceDetailsHeader>
      <ShiftTypes workplace={workplace}></ShiftTypes>
    </>
  );
};

export default WorkplaceDetails;
