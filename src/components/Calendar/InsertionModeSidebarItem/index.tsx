import { getWorkplaces } from 'api/modules/workplaces';
import { SidebarLink } from 'components/App/Container/Sidebar/SidebarLink';
import { InsertModeContext } from 'context/InsertModeContext';
import React, { useContext, useEffect, useState } from 'react';
import { PlusSquare, XSquare } from 'react-feather';
import { Status } from 'util/status';

type Props = {
  setWorkplaces: Function;
};

const InsertionModeSidebarItem = ({
  setWorkplaces,
}: Props) => {
  const { insertModeActive, setInsertModeActive } = useContext(
    InsertModeContext,
  );
  const [status, setStatus] = useState(Status.Idle);
  const { workplaces } = useContext(InsertModeContext);

  useEffect(() => {
    if (workplaces) return;
    if (!insertModeActive) return;

    setStatus(Status.Loading);
    getWorkplaces(true)
      .then(result => {
        setWorkplaces(result);
        setStatus(Status.Resolved);
      })
      .catch(error => {
        setStatus(Status.Rejected);
      });
  }, [insertModeActive, workplaces, setWorkplaces]);

  return (
    <>
      <SidebarLink
        onClick={() => {
          setInsertModeActive(active => !active);
        }}
        icon={insertModeActive ? <XSquare /> : <PlusSquare />}
      >
        {status === Status.Loading
          ? 'Loading...'
          : insertModeActive
          ? 'Exit Insert Mode'
          : 'Enter Insert Mode'}
      </SidebarLink>
    </>
  );
};

export default InsertionModeSidebarItem;
