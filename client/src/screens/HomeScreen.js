import { Container, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Join from '../components/Join'
import { useNavigate } from "react-router-dom"


function HomeScreen() {

    const navigate = useNavigate()

    const handlePlay = (name, code) => {
      navigate("/game", { state: {
        "name": name,
        "code": code
      }})
    }


  return (
    <Container maxWidth="sm">
        <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
            <Typography variant="h2" sx={{marginTop: 5, marginBottom: 10}}>Tic-Tac-Toe</Typography>
            <Join handlePlay={handlePlay}/>
        </Stack>
    </Container>
  )
}

export default HomeScreen