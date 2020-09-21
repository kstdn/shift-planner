import { DeleteTwoTone } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ShiftTypeDto } from 'api/modules/workplaces/dto/shift-type.dto';
import React from 'react';
import VisualizationPicker from '../VisualizationPicker';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';

type Props = {
  data: ShiftTypeDto[];
  onPropChange: (
    changes: Partial<ShiftTypeDto>,
    recordId: string,
    data: ShiftTypeDto[],
  ) => any;
  onDeleteClick: (shiftTypeDto: ShiftTypeDto) => any;
};

export const ShiftTypesTable = ({
  data,
  onPropChange,
  onDeleteClick,
}: Props) => {
  const columns: ColumnsType<ShiftTypeDto> = [
    {
      title: 'Order',
      dataIndex: 'sortOrder',
      width: '75px',
    },
    {
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
      title: 'Visualization',
      align: 'center',
      render: (placeholderParam, record) => (
        <VisualizationPicker
          position={record.position}
          backgroundColor={record.backgroundColor}
          onChange={changes => onPropChange(changes, record.id!, data)}
        />
      ),
    },
    {
      title: '',
      align: 'right',
      render: (placeholderParam, record) => (
        <Button
          onClick={() => onDeleteClick(record)}
          icon={<DeleteTwoTone />}
        ></Button>
      ),
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      columns={columns}
      dataSource={data}
      rowKey={'id'}
      pagination={false}
    />
  );
};
