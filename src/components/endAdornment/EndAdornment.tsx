import React, { FC } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  onClick(): void;
}

const endAdornment: FC<IProps> = ({ onClick }) => {
  return (
    <InputAdornment position="end">
      <IconButton size="small" onClick={onClick}>
        <CheckIcon />
      </IconButton>
    </InputAdornment>
  );
};

export default endAdornment;
