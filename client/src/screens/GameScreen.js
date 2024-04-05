import { Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import TTTBoard from '../components/TTTBoard'

function GameScreen() {

    const name = "LINT"

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" sx={{marginTop: 5, marginBottom: 5}}>Tic-Tac-Toe</Typography>
            <TTTBoard/>
            <Typography variant="h3" sx={{marginTop: 5, marginBottom: 5}}>{name + "'s Turn"}</Typography>
        </Container>
    )
}

export default GameScreen