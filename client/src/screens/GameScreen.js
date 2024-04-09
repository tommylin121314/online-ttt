import { Stack, Box, Modal, Container, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRoutes, useLocation, useNavigate } from "react-router-dom"
import TTTBoard from '../components/TTTBoard'
import io from 'socket.io-client'


const socket = io.connect('http://localhost:8000');


function GameScreen() {

    const state = useLocation().state
    const navigate = useNavigate()

    const name = state.name
    const code = state.code
    
    const [mark, setMark] = useState("")
    const [players, setPlayers] = useState([])
    const [isTurn, setIsTurn] = useState()
    const [gameStarted, setGameStarted] = useState(false)
    const [lastWinner, setLastWinner] = useState("")
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
    const [showRoomFullModal, setShowRoomFullModal] = useState(false)

    useEffect(() => {
        socket.emit("joinGame", {
            "name": name,
            "code": code
        })
    }, [])

    useEffect(() => {
        if (gameStarted) {
            setIsTurn(mark === 'X')
        }
    }, [gameStarted])

    useEffect(() => {
        console.log("Mark changed " + mark)
    }, [mark])

    useEffect(() => {
        socket.on('turnTaken', (board) => {
            setBoard([...board])
            setIsTurn(true)
        })

        socket.on('roomFull', () => {
            setShowRoomFullModal(true)
        })

        socket.on('assignMark', (data) => {
            setMark(data.mark)
        })

        socket.on('playerJoined', (players) => {
            setPlayers(players)
        })

        socket.on('gameStart', () => {
            setGameStarted(true)
        })

        socket.on('gameOver', (winner) => {
            setGameStarted(false)
            setLastWinner(winner)
            setIsTurn(false)
        })

        socket.on('restart', () => {
            setLastWinner('')
            setBoard(['', '', '', '', '', '', '', '', ''])
            setGameStarted(true)
        })

    }, [socket])

    const place = (index) => {
        board[index] = mark
        setBoard([...board])
    }

    const takeTurn = (index) => {
        place(index)
        socket.emit("takeTurn", {
            "code": code,
            "board": board
        })
        if (checkWin()) {
            socket.emit("gameWon", {
                "code": code,
                "winner": name
            })
        }
        setIsTurn(false)
    }

    const checkWin = () => {
        const win = mark.concat(mark, mark)
        for (let i = 0; i < 3; i++) {
            if (board[i].concat(board[i+3], board[i+6]) === win) {
                return true
            }
            else if (board[i*3].concat(board[i*3+1], board[i*3+2]) === win) {
                return true
            }
        }
        if (board[0].concat(board[4], board[8]) === win) {
            return true
        }
        else if (board[2].concat(board[4], board[6]) === win) {
            return true
        }
        return false
    }

    const playAgain = () => {
        socket.emit("playAgain", {
            'code': code
        })
    }

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            navigate("/")
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "20vw",
        height: '15vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 1
      };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" sx={{marginTop: 5, marginBottom: 5}}>Tic-Tac-Toe</Typography>
            <TTTBoard mark={mark} isTurn={isTurn} board={board} takeTurn={takeTurn}/>
            {gameStarted ? <Typography variant="h3" sx={{marginTop: 5, marginBottom: 5}}>
                {(isTurn ? 
                    (mark === 'O' ? 
                        players[1] : players[0])
                    : (mark === 'X' ? 
                        players[1] : players[0])) + "'s Turn"}</Typography>
                : lastWinner === '' ?
                    <Typography variant='h3' sx={{marginTop: 5, marginBottom: 5}}>Waiting for Opponent...</Typography>
                    : <Typography variant='h3' sx={{marginTop: 5, marginBottom: 5}}>{lastWinner + " Won!"}</Typography>
            }
            {lastWinner === '' ?
                <Typography variant="h4" sx={{marginTop: 5, marginBottom: 5}}>{"Room code: " + code}</Typography>
                : <Button onClick={playAgain}>Play Again</Button>
            }
            <Modal
                open={showRoomFullModal}
                onClose={handleClose}
                >
                <Box textAlign='center' sx={{ ...style, '.MuiOutlinedInput-notchedOutline': { border: 0 }}}>
                    <Stack sx={{height: '100%'}} direction="column" justifyContent='space-evenly' alignItems='center'>
                        <Typography align="center" variant="h4">Room Full</Typography>
                        <Button onClick={handleClose}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
            {/* <Modal
                open={lastWinner !== ''}
                onClose={() => {return}}
                >
                <Box textAlign='center' sx={{ ...style, '.MuiOutlinedInput-notchedOutline': { border: 0 }}}>
                    <Stack sx={{height: '100%'}} direction="column" justifyContent='space-evenly' alignItems='center'>
                        <Typography align="center" variant="h4">{lastWinner + " Won!"}</Typography>
                        <Button onClick={handleClose}>Close</Button>
                    </Stack>
                </Box>
            </Modal> */}
        </Container>
    )
}

export default GameScreen