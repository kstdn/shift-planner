import React from 'react';
import { Result } from 'antd';

export const PageError = () => {
  return (
    <Result
      status='warning'
      title='There has been an error'
    />
  );
};
