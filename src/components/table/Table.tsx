import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table as MuiTable,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Tooltip,
  TextField
} from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { RowInterface } from 'types/entityType';

import rowsStore from 'stores/rowsStore';

import classes from './Table.module.scss';

const defaultRow = {
  id: 0,
  rowName: 'Новая работа',
  total: 0,
  salary: 0,
  mimExploitation: 0,
  machineOperatorSalary: 0,
  materials: 0,
  mainCosts: 0,
  supportCosts: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  child: []
} as RowInterface;

const Table: FC = () => {
  const { rowsTree } = rowsStore;
  const [editing, setEditing] = useState<RowInterface>(defaultRow);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(event.target.id, event.target.value, editing);
      switch (event.target.id) {
        case 'salary-input': {
          if (event.target.value !== '' && !Number.isNaN(event.target.value)) {
            setEditing((row) => ({
              ...row,
              salary: Number(event.target.value)
            }));
          }
          break;
        }
        case 'rowName-input': {
          if (event.target.value !== '') {
            setEditing((row) => ({
              ...row,
              rowName: event.target.value
            }));
          }
          break;
        }
        case 'equipmentCosts-input': {
          if (event.target.value !== '' && !Number.isNaN(event.target.value)) {
            setEditing((row) => ({
              ...row,
              equipmentCosts: Number(event.target.value)
            }));
          }
          break;
        }
        case 'overheads-input': {
          if (event.target.value !== '' && !Number.isNaN(event.target.value)) {
            setEditing((row) => ({
              ...row,
              overheads: Number(event.target.value)
            }));
          }
          break;
        }
        case 'estimatedProfit-input': {
          if (event.target.value !== '' && !Number.isNaN(event.target.value)) {
            setEditing((row) => ({
              ...row,
              estimatedProfit: Number(event.target.value)
            }));
          }
          break;
        }
      }
    },
    []
  );

  useEffect(() => {
    rowsStore.getRows();
  }, []);

  return (
    <TableContainer className={classes.container}>
      <MuiTable stickyHeader>
        <TableHead>
          <TableRow className={classes.headerRow}>
            <TableCell className={classes.headerCell} align="left">
              Уровень
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              Наименование работ
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              Основная з/п
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              Оборудование
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              Накладные расходы
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              Сметная прибыль
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsTree.map((row) => (
            <TableRow
              key={row.id}
              className={classes.bodyRow}
              onClick={() => {
                if (editing?.id === row.id) return;
                setEditing(defaultRow);
              }}
              onDoubleClick={() => {
                setEditing(row);
              }}
            >
              <TableCell
                component="th"
                scope="row"
                className={classes.levelCell}
              >
                <Tooltip
                  title={
                    <IconButton
                      size="small"
                      onClick={() => {
                        rowsStore.deleteRow(row.id);
                      }}
                    >
                      <DeleteOutlineIcon color="error" />
                    </IconButton>
                  }
                  placement="right"
                  className={classes.tooltip}
                >
                  <IconButton size="small" className={classes.icon}>
                    <TextSnippetIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="left" className={classes.nameCell}>
                {editing?.id === row.id ? (
                  <TextField
                    variant="outlined"
                    id="rowName-input"
                    size="small"
                    fullWidth
                    value={editing.rowName}
                    onChange={onChange}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                      if (event.key !== 'Enter') return;
                      rowsStore.updateRow(editing.id, { ...editing });
                      setEditing(defaultRow);
                    }}
                  />
                ) : (
                  row.rowName
                )}
              </TableCell>
              <TableCell align="left" className={classes.bodyCell}>
                {editing?.id === row.id ? (
                  <TextField
                    variant="outlined"
                    id="salary-input"
                    size="small"
                    fullWidth
                    value={editing.salary}
                    onChange={onChange}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                      if (event.key !== 'Enter') return;
                      rowsStore.updateRow(editing.id, { ...editing });
                      setEditing(defaultRow);
                    }}
                  />
                ) : (
                  row.salary
                )}
              </TableCell>
              <TableCell align="left" className={classes.bodyCell}>
                {editing?.id === row.id ? (
                  <TextField
                    variant="outlined"
                    id="equipmentCosts-input"
                    size="small"
                    fullWidth
                    value={editing.equipmentCosts}
                    onChange={onChange}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                      if (event.key !== 'Enter') return;
                      rowsStore.updateRow(editing.id, { ...editing });
                      setEditing(defaultRow);
                    }}
                  />
                ) : (
                  row.equipmentCosts
                )}
              </TableCell>
              <TableCell align="left" className={classes.bodyCell}>
                {editing?.id === row.id ? (
                  <TextField
                    variant="outlined"
                    id="overheads-input"
                    size="small"
                    fullWidth
                    value={editing.overheads}
                    onChange={onChange}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                      if (event.key !== 'Enter') return;
                      rowsStore.updateRow(editing.id, { ...editing });
                      setEditing(defaultRow);
                    }}
                  />
                ) : (
                  row.overheads
                )}
              </TableCell>
              <TableCell align="left" className={classes.bodyCell}>
                {editing?.id === row.id ? (
                  <TextField
                    variant="outlined"
                    id="estimatedProfit-input"
                    size="small"
                    fullWidth
                    value={editing.estimatedProfit}
                    onChange={onChange}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                      if (event.key !== 'Enter') return;
                      rowsStore.updateRow(editing.id, { ...editing });
                      setEditing(defaultRow);
                    }}
                  />
                ) : (
                  row.estimatedProfit
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default observer(Table);
