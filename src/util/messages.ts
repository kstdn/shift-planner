import { message } from 'antd';

message.config({
  maxCount: 1,
  duration: 0.5,
});

export const showLoadingMessage = () => {
  return message.loading('Loading...', 0);
}

export const showSuccessMessage = () => {
  return message.success('Success');
}

export const showErrorMessage = () => {
  return message.error('Error');
}