import { useState } from "react"
import { Square } from "./components/Square.jsx"
import { TURNS, WINNER_COMBOS } from "./constants.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
function App() {
const [board, setBoard] = useState(Array(9).fill(null))
const [turn, setTurn] = useState(TURNS.X)
const [winner, setWinner] = useState(null)

const checkWinner = (boardToCheck) => {
  // Reviso todas las combinaciones ganadoras para deifnir un ganador
 for (const combo of WINNER_COMBOS) {
  const [a, b, c] = combo
  if (
    boardToCheck[a] && // 0 -> x u o
    boardToCheck[a] === boardToCheck[b] && // 1 tmb x u o
    boardToCheck[a] === boardToCheck[c] // 2 tmb x u o
  ) {
    return boardToCheck[a] // return winner
  }
 }
 // si no hay ganador
 return null
}

const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}

const updateBoard = (index) => {
  // No actualizo si ya tiene algo
  if(board[index]) return
// Actualizo el tablero
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)
// Cambio el turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)
  // Revisar si hay ganador
  const newWinner = checkWinner(newBoard)
  if (newWinner) {
    setWinner(newWinner)
  } else if (checkEndGame(newBoard)) {
    setWinner(false) // empate
  }
}

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Game reset</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
        <Square
        key={index}
        index={index}
        updateBoard={updateBoard}
        >
          {board[index]}
          </Square>
            )
          })
        }

      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

     <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
