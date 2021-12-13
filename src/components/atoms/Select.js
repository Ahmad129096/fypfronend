import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function Select() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Featured
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'Featured',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Price- Low to High</option>
          <option value={20}>Price- High to Low</option>
          <option value={30}>Discount- Low to High </option>
          <option value={40}>Discount- High to Low </option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}