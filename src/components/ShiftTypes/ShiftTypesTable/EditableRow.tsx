import { Form } from 'antd';
import React, { FC } from 'react';
import { EditableContext } from './editable-context';

interface EditableRowProps {
  index: number;
}

export const EditableRow: FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
