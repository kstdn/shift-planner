import { Form, Input } from 'antd';
import { ShiftTypeDto } from 'api/modules/workplaces/dto/shift-type.dto';
import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { EditableContext } from './editable-context';

interface EditableCellProps {
  title: ReactNode;
  editable: boolean;
  children: ReactNode;
  dataIndex: keyof ShiftTypeDto;
  record: ShiftTypeDto;
  handleSave: (record: ShiftTypeDto) => void;
}

export const EditableCell: FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current && inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
