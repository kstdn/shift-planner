import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ShiftTypePosition } from 'api/modules/workplaces/dto/shift-type-position.enum';
import { ShiftTypeDto } from 'api/modules/workplaces/dto/shift-type.dto';
import React, { useState } from 'react';
import ColorPickerTile from '../ColorPickerTile';
import PositionPicker from '../PositionPicker';
import { EditableRow } from './EditableRow';
import { EditableCell } from './EditableCell';

type Props = {
  data: ShiftTypeDto[],
  onPositionChange: (position: ShiftTypePosition, index: number) => any,
  onColorChange: (color: string, index: number) => any,
  handleSave: (record: ShiftTypeDto) => any;
}

export const ShiftTypesTable = ({ data, onPositionChange, onColorChange, handleSave }: Props) => {
  const [columns, setColumns] = useState<ColumnsType<ShiftTypeDto>>([
    {
      title: 'Name',
      dataIndex: 'name',
      width: '200px',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'name',
        title: 'Name',
        handleSave,
      }),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      render: (position, record, index) => (
        <PositionPicker
          position={position}
          color={record.backgroundColor}
          onChange={position => onPositionChange(position, index) }
        />
      ),
    },
    {
      title: 'Color',
      dataIndex: 'backgroundColor',
      render: (color, record, index) => (
        <ColorPickerTile
          color={color}
          onColorChange={color => onColorChange(color, index) }
        />
      ),
    },
  ]);

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
