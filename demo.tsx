import React, { useState } from 'react';
import { Table, Input } from 'antd';

interface Item {
  key: string;
  name: string;
  age: number;
}

interface Column {
  key: string;
  dataIndex: string;
}

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<Item[]>([
    { key: '0', name: 'koki', age: 18 },
    { key: '1', name: 'koki', age: 18 },
  ]);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const columns: Column[] = [
    { key: 'name', dataIndex: 'name' },
    { key: 'age', dataIndex: 'age' },
  ];

  const editCell = (key: string, dataIndex: string, value: any) => {
    const newData = dataSource.map((item) =>
      item.key === key ? { ...item, [dataIndex]: value } : item
    );
    setDataSource(newData);
    setEditingKey(null);
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }: any) => {
    const inputNode = <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Input
            value={record[dataIndex]}
            onChange={(e) => editCell(record.key, dataIndex, e.target.value)}
            onPressEnter={() =>
              editCell(record.key, dataIndex, record[dataIndex])
            }
            onBlur={() => editCell(record.key, dataIndex, record[dataIndex])}
          />
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns.map((column) => {
        return {
          ...column,
          onCell: (record: Item) => ({
            record,
            dataIndex: column.dataIndex,
            title: column.key,
            editing: isEditing(record),
          }),
        };
      })}
      rowKey="key"
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      onRow={(record: Item, index: number) => ({
        onDoubleClick: () => {
          if (!editingKey) {
            setEditingKey(record.key);
          }
        },
      })}
    />
  );
};

export default App;
