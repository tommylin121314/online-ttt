import { Box, Container, Grid, Item, Stack } from '@mui/material'
import React, { useState } from 'react'
import TTTCell from './TTTCell'

function TTTBoard(props) {

  return (
    <div>
      <Grid container sx={{aspectRatio: 1/1, width: '99%', margin: 0}}>
        {props.board.map((cell, index) => (
          <TTTCell cell={cell} key={index} index={index} takeTurn={props.takeTurn} isTurn={props.isTurn}/>
        ))}
      </Grid>
    </div>
  )
}

export default TTTBoard 