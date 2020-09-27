import { getWorkplaces } from 'api/modules/workplaces';
import { SidebarLink } from 'components/App/Container/Sidebar/SidebarLink';
import { WorkplacesContext } from 'context/WorkplacesContext';
import React, { useContext, useEffect, useState } from 'react';
import { PlusSquare, XSquare } from 'react-feather';
import { Status } from 'util/status';

type Props = {
  onInsertModeActivated: Function;
  setWorkplaces: Function;
};

const InsertionModeSidebarItem = ({ onInsertModeActivated, setWorkplaces }: Props) => {
  const [active, setActive] = useState(false);

  const [status, setStatus] = useState(Status.Idle);
  const { workplaces } = useContext(WorkplacesContext);

  useEffect(() => {
    if (workplaces) return;
    if (!active) return;

    setStatus(Status.Loading);
    getWorkplaces(true)
      .then(result => {
        onInsertModeActivated();
        setWorkplaces(result);
        setStatus(Status.Resolved);
      })
      .catch(error => {
        setStatus(Status.Rejected);
      });
  }, [active, workplaces]);

  return (
    <>
      <SidebarLink
        onClick={() => {
          setActive(active => !active);
          if (workplaces && !active) onInsertModeActivated();
        }}
        icon={active ? <XSquare /> : <PlusSquare />}
      >
        {status === Status.Loading ? 'Loading...' : active ? 'Exit Insert Mode' : 'Enter Insert Mode'}
      </SidebarLink>
    </>
  );
};

export default InsertionModeSidebarItem;
