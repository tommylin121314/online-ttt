import { Grid, Box, Paper, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import React from 'react'

function TTTCell(props) {
    
    const handleOnClick = () => {
        if (props.isTurn) {
            props.takeTurn(props.index)
        }
    }

    return (
        <Grid item xs={4} sx={{height: '33.3%', margin: 0}}>  
            {
                props.cell === 'X' ?
                    <CloseOutlinedIcon sx={{boxSizing: 'border-box', border: '2px solid black', height: '100%', width: '100%'}}/> :
                    (props.cell === 'O' ? 
                        <FiberManualRecordOutlinedIcon sx={{boxSizing: 'border-box', border: '2px solid black', height: '100%', width: '100%'}}/> :
                        <Box 
                            onClick={handleOnClick}
                            sx={{boxSizing: 'border-box', border: '2px solid black', height: '100%', width: '100%'}}>
                        </Box>
                    )
            }
        </Grid>
    )
}

export default TTTCell