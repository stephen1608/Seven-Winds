import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent
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
  TextField
} from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import EndAdornment from 'components/endAdornment';

import { RowInterface } from 'types/entityType';

import rowsStore from 'stores/rowsStore';

import classes from './Table.module.scss';

const defaultRow = {
  id: 0,
  rowName: '',
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
  level: 0,
  parentId: undefined,
  child: []
} as RowInterface;

enum fields {
  rowName = 'rowName',
  salary = 'salary',
  equipmentCosts = 'equipmentCosts',
  overheads = 'overheads',
  estimatedProfit = 'estimatedProfit',
  parentId = 'parentId',
  level = 'level'
}

const Table: FC = () => {
  const { rowsTree } = rowsStore;
  const [editing, setEditing] = useState<RowInterface>(defaultRow);
  const [deleteIconOnRow, setDeleteIconOnRow] = useState<number>(-1);
  const [blockDeleting, setBlockDeleting] = useState<number>(defaultRow.id);

  useEffect(() => {
    if (rowsTree.length !== 0) return;

    const addFirstRow = async () => {
      const newRow = await rowsStore.addRow({
        ...defaultRow,
        [fields.level]: 0,
        [fields.parentId]: undefined
      });
      if (newRow) {
        setEditing(newRow);
        setBlockDeleting(newRow.id);
      }
    };

    addFirstRow();
  }, [rowsTree.length]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.target.id !== fields.rowName) {
        if (!Number.isNaN(Number(event.target.value))) {
          setEditing((row) => ({
            ...row,
            [event.target.id]: Number(event.target.value)
          }));
          setBlockDeleting(Number(event.target.value));
        }
      } else {
        setEditing((row) => ({
          ...row,
          [fields.rowName]: event.target.value
        }));
        setBlockDeleting(Number(event.target.value));
      }
    },
    []
  );

  const updateRow = () => {
    rowsStore.updateRow(editing.id, { ...editing });
    setEditing(defaultRow);
    setBlockDeleting(defaultRow.id);
  };

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Enter') return;
      updateRow();
    },
    [editing]
  );

  const onIconClick = useCallback(
    async (event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
      const id = event.currentTarget.getAttribute('row-id');
      const parentId = event.currentTarget.getAttribute('parent-id');
      const level = event.currentTarget.getAttribute('row-level');
      if (id) {
        let newRow = null;
        if (Number(parentId) > 0) {
          newRow = await rowsStore.addRow(
            {
              ...defaultRow,
              [fields.parentId]: Number(parentId)
            },
            Number(id)
          );
        } else {
          newRow = await rowsStore.addRow(
            { ...defaultRow, [fields.parentId]: undefined },
            Number(id)
          );
        }
        if (newRow) {
          if (Number(parentId) > 0) {
            setEditing({
              ...newRow,
              [fields.parentId]: Number(parentId),
              [fields.level]: Number(level)
            });
          } else {
            setEditing({ ...newRow, [fields.parentId]: undefined });
          }
          setBlockDeleting(newRow.id);
        }
      }
    },
    []
  );

  return (
    <TableContainer className={classes.container}>
      <MuiTable stickyHeader>
        <TableHead>
          <TableRow className={classes.headerRow}>
            <TableCell className={classes.headerCell} align="left">
              ??????????????
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              ???????????????????????? ??????????
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              ???????????????? ??/??
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              ????????????????????????
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              ?????????????????? ??????????????
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              ?????????????? ??????????????
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
                setBlockDeleting(defaultRow.id);
              }}
              onDoubleClick={() => {
                setEditing(row);
                setBlockDeleting(row.id);
              }}
            >
              <TableCell
                component="th"
                scope="row"
                className={classes.levelCell}
              >
                <IconButton
                  size="small"
                  className={classes.icon}
                  onMouseEnter={() => setDeleteIconOnRow(row.id)}
                  onMouseLeave={() => setDeleteIconOnRow(-1)}
                  sx={
                    row.level
                      ? { marginLeft: `${row.level * 16}px` }
                      : { marginLeft: 0 }
                  }
                >
                  <TextSnippetIcon
                    row-id={row.id}
                    parent-id={row.parentId}
                    row-level={row.level}
                    onClick={onIconClick}
                    className={classes.textIcon}
                  />
                  <DeleteOutlineIcon
                    color="error"
                    onClick={() => {
                      rowsStore.deleteRow(row.id);
                    }}
                    className={
                      deleteIconOnRow === row.id && blockDeleting !== row.id
                        ? classes.deleteIcon
                        : classes.hideDeleteIcon
                    }
                  />
                  <div
                    className={row.level ? classes.connectionLine : undefined}
                  />
                </IconButton>
              </TableCell>
              <TableCell align="left" className={classes.nameCell}>
                {editing?.id === row.id ? (
                  <TextField
                    variant="outlined"
                    id={fields.rowName}
                    size="small"
                    fullWidth
                    value={editing.rowName}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    InputProps={{
                      endAdornment: <EndAdornment onClick={updateRow} />
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
                    id={fields.salary}
                    size="small"
                    fullWidth
                    value={editing.salary}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    InputProps={{
                      endAdornment: <EndAdornment onClick={updateRow} />
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
                    id={fields.equipmentCosts}
                    size="small"
                    fullWidth
                    value={editing.equipmentCosts}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    InputProps={{
                      endAdornment: <EndAdornment onClick={updateRow} />
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
                    id={fields.overheads}
                    size="small"
                    fullWidth
                    value={editing.overheads}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    InputProps={{
                      endAdornment: <EndAdornment onClick={updateRow} />
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
                    id={fields.estimatedProfit}
                    size="small"
                    fullWidth
                    value={editing.estimatedProfit}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    InputProps={{
                      endAdornment: <EndAdornment onClick={updateRow} />
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
