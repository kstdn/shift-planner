import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result } from 'antd';

export const PageError = () => {
  const history = useHistory();

  const redirect = () => history.push('/');

  return (
    <Result
      status='warning'
      title='There has been an error'
    />
  );
};
