import { Box, Container, Grid, Item, Stack } from '@mui/material'
import React, { useState } from 'react'
import TTTCell from './TTTCell'

function TTTBoard(props) {

  const [board, setBoard] = useState(['', 'X', '', 'O', 'O', '', 'X', '', ''])
  const mark = 'O'

  const place = (index) => {
    board[index] = mark
    setBoard([...board])
  }

  return (
    <div>
      <Grid container sx={{aspectRatio: 1/1, width: '99%', margin: 0}}>
        {board.map((cell, index) => (
          <TTTCell cell={cell} index={index} place={place}/>
        ))}
      </Grid>
    </div>
  )
}

export default TTTBoard 