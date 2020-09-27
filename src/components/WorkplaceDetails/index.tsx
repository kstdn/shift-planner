import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as Styled from './styled';
import ShiftTypes from 'components/ShiftTypes';
import { ChevronLeft } from 'react-feather';

const WorkplaceDetails = () => {
  const { state: workplace } = useLocation<WorkplaceDto>();

  const history = useHistory();

  return (
    <>
      <Styled.WorkplaceDetailsHeader onClick={() => history.goBack()} >
        <ChevronLeft /> {workplace.name}
      </Styled.WorkplaceDetailsHeader>
      <ShiftTypes workplace={workplace}></ShiftTypes>
    </>
  );
};

export default WorkplaceDetails;
