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
  onPropChange: (changes: Partial<ShiftTypeDto>,  recordId: string) => void;
}

export const EditableCell: FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  onPropChange,
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

  const handleChange = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();

      if(values[dataIndex] !== record[dataIndex]) {
        onPropChange({ [dataIndex]: values[dataIndex] }, record.id!);
      }

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
        <Input ref={inputRef} onPressEnter={handleChange} onBlur={handleChange} />
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
