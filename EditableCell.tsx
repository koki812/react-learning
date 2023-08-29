// EditableCell.tsx

import React, { useState } from 'react';
import { Input } from 'antd';

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'text' | 'number';
  record: any;
  index: number;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  handleSave,
}) => {
  const [inputValue, setInputValue] = useState(record[dataIndex]);

  const save = () => {
    handleSave({ ...record, [dataIndex]: inputValue });
  };

  let cellContent: React.ReactNode = record[dataIndex];

  if (editing) {
    cellContent = (
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={save}
        onBlur={save}
      />
    );
  }

  return <td onDoubleClick={save}>{cellContent}</td>;
};

export default EditableCell;
