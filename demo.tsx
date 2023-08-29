// App.tsx

import React, { useState } from 'react';
import { Table } from 'antd';
import EditableCell from './EditableCell';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: '0',
      name: 'Edward King 0',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    // ... Add more data items
  ]);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: DataType) => record.key === editingKey;

  const handleDoubleClick = (record: DataType) => {
    setEditingKey(record.key);
  };

  const handleSave = (record: DataType) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...record });
      setData(newData);
      setEditingKey('');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, record: DataType) => (
        <EditableCell
          editing={isEditing(record)}
          dataIndex="name"
          title="Name"
          inputType="text"
          record={record}
          index={record.key as number}
          handleSave={handleSave}
        />
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      render: (text: number, record: DataType) => (
        <EditableCell
          editing={isEditing(record)}
          dataIndex="age"
          title="Age"
          inputType="number"
          record={record}
          index={record.key as number}
          handleSave={handleSave}
        />
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (text: string, record: DataType) => (
        <EditableCell
          editing={isEditing(record)}
          dataIndex="address"
          title="Address"
          inputType="text"
          record={record}
          index={record.key as number}
          handleSave={handleSave}
        />
      ),
    },
  ];

  return (
    <Table
      bordered
      dataSource={data}
      columns={columns}
      rowClassName={(record) => (isEditing(record) ? 'editable-row' : '')}
      onRow={(record) => ({
        onDoubleClick: () => handleDoubleClick(record),
      })}
    />
  );
};

export default App;
