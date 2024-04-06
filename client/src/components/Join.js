import { Stack, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'


function Join(props) {

  const [name, setName] = useState("")
  const [code, setCode] = useState("")

  const handlePlay = () => {
    props.handlePlay(name, code)
  }

  return (
    <Stack direction="column" spacing={1} sx={{width: '60%'}}>
      <Typography variant="h4">Join Room</Typography>
      <TextField variant="outlined" label="Name" 
                 onChange={(event) => setName(event.target.value)}
                 value={name}></TextField>
      <TextField variant="outlined" label="Room Code"
                 onChange={(event) => setCode(event.target.value)}
                 value={code}></TextField>
      <Button variant="outlined" onClick={handlePlay}>Play!</Button>
    </Stack>
  )
}

export default Join