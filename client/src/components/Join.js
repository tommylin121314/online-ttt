import { Stack, TextField, Typography, Button } from '@mui/material'
import React from 'react'

function Join() {
  return (
    <Stack direction="column" spacing={1} sx={{width: '60%'}}>
        <Typography variant="h5">Join Room</Typography>
        <TextField variant="outlined" label="Name"></TextField>
        <TextField variant="outlined" label="Room Code"></TextField>
        <Button variant="outlined">Play!</Button>
    </Stack>
  )
}

export default Join