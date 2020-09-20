import { DeleteTwoTone } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ShiftTypeDto } from 'api/modules/workplaces/dto/shift-type.dto';
import React from 'react';
import ColorPickerTile from '../ColorPickerTile';
import PositionPicker from '../PositionPicker';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';

type Props = {
  data: ShiftTypeDto[],
  onPropChange: (name: string, dataIndex: keyof ShiftTypeDto, recordId: string, data: ShiftTypeDto[]) => any;
}

export const ShiftTypesTable = ({ data, onPropChange }: Props) => {
  const columns: ColumnsType<ShiftTypeDto> = [
    {
      title: 'Order',
      dataIndex: 'sortOrder',
      width: '75px',
    },{
      title: 'Name',
      dataIndex: 'name',
      width: '200px',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'name',
        title: 'Name',
        onPropChange,
      }),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      render: (position, record) => (
        <PositionPicker
          position={position}
          color={record.backgroundColor}
          onChange={position => onPropChange(position, 'position', record.id, data) }
        />
      ),
    },
    {
      title: 'Color',
      dataIndex: 'backgroundColor',
      render: (color, record, index) => (
        <ColorPickerTile
          color={color}
          onColorChange={color => onPropChange(color, 'backgroundColor', record.id, data) }
        />
      ),
    }, {
      title: '',
      align: 'right',
      render: () => <Button icon={<DeleteTwoTone />}></Button> 
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return <Table
    components={components}
    rowClassName={() => 'editable-row'}
    columns={columns}
    dataSource={data}
    rowKey={'id'}
    pagination={false}
  />;
};
