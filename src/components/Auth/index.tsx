import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from 'store/actions';

const StyledAuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type FormValues = {
  username: string,
  password: string,
}

export const Authentication = () => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const handleSubmit = ({ username, password }: FormValues) => {
    dispatch(
      login({
        username,
        password,
      }),
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledAuthContainer>
    <Card style={{ width: 450 }}>
      <Form
        {...layout}
        name='basic'
        initialValues={{ remember: false }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </StyledAuthContainer>
  );
};
