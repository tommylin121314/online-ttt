import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Join from '../components/Join'

function HomeScreen() {
  return (
    <Container maxWidth="sm">
        <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
            <Typography variant="h2" sx={{marginTop: 5, marginBottom: 10}}>Tic-Tac-Toe</Typography>
            <Join/>
        </Stack>
    </Container>
  )
}

export default HomeScreen