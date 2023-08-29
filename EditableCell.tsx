// EditableCell.tsx

import React, { useState, useEffect } from 'react';

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'text' | 'number';
  record: any;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  handleSave,
}) => {
  const [inputValue, setInputValue] = useState(record[dataIndex]);

  useEffect(() => {
    if (editing) {
      setInputValue(record[dataIndex]);
    }
  }, [editing]);

  const save = () => {
    handleSave({ ...record, [dataIndex]: inputValue });
  };

  let cellContent: React.ReactNode = record[dataIndex];

  if (editing) {
    cellContent = (
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={save}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
      />
    );
  }

  return <td onDoubleClick={save}>{cellContent}</td>;
};

export default EditableCell;
