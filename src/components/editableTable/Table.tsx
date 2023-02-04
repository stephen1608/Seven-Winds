import React, { FC } from 'react';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridRowParams,
  GridCallbackDetails,
  GridEventListener
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate
} from '@mui/x-data-grid-generator';

import rowsStore from 'stores/rowsStore';

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    editable: true
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    editable: true
  }
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 10,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 20,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 30,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 40,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 50,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 12,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 22,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 32,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 42,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 52,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 13,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 23,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 33,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 43,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 53,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 11,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 21,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 31,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 41,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 51,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 16,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 26,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 36,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 46,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 56,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 15,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 25,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 35,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 45,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  },
  {
    id: 55,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate()
  }
];

const Table: FC = () => {
  const { rowsTree, loading } = rowsStore;

  const onRowDoubleClick: GridEventListener<'rowDoubleClick'> = (params) => {
    console.log(`row "${params.id}" clicked`);
  };

  return (
    <Box style={{ width: '100%', maxHeight: 'calc(100vh - 88px)' }}>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={columns}
        headerHeight={41}
        hideFooter
        rowHeight={60}
        loading={loading}
        onRowDoubleClick={onRowDoubleClick}
        experimentalFeatures={{ newEditingApi: true }}
        sx={{
          border: 0,
          borderRadius: 0,
          '& .MuiDataGrid-cell:active': {
            border: 'none'
          }
        }}
      />
    </Box>
  );
};

export default Table;
