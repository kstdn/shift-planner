import { List } from 'antd';
import { getWorkplaces } from 'api/modules/workplaces';
import { WorkplaceDto } from 'api/modules/workplaces/dto/workplace.dto';
import React, { useEffect, useState } from 'react';
import { Loader } from 'shared/components/Loader';
import { Status } from 'util/status';
import * as Styled from './styled';
import { Link } from 'react-router-dom';
import { Route } from 'util/route.enum';
import { PageError } from 'shared/components/PageError';
import { NoResults } from 'shared/components/NoResults';

const Workplaces = () => {
  const [status, setStatus] = useState(Status.Idle);
  const [workplaces, setWorkplaces] = useState<WorkplaceDto[]>();

  useEffect(() => {
    setStatus(Status.Loading);
    getWorkplaces(false)
      .then(result => {
        setWorkplaces(result);
        setStatus(Status.Resolved);
      })
      .catch(error => {
        setStatus(Status.Rejected);
      });
  }, []);

  return (
    <>
      <Styled.WorkplacesHeader>Workplaces</Styled.WorkplacesHeader>
      {status === Status.Loading && <Loader />}
      {status === Status.Rejected && <PageError />}
      {status === Status.Resolved && !workplaces!.length && <NoResults />}
      {status === Status.Resolved && !!workplaces!.length &&
        <Styled.WorkplacesList>
          <List
            itemLayout='horizontal'
            dataSource={workplaces}
            renderItem={workplace => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link
                      to={{
                        pathname: `${Route.Workplaces}/${workplace.id}`,
                        state: workplace,
                      }}
                    >
                      {workplace.name}
                    </Link>
                  }
                />
              </List.Item>
            )}
          />
        </Styled.WorkplacesList>
      }
    </>
  );
};

export default Workplaces;
