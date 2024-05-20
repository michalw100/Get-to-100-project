import React, { useState } from 'react'
import Game from './Game'

const GameBoard = ({ playersArray, setPlayersArray, setTopLeaders }) => {
    const calculateColumnWidth = () => {
        return `${100 / playersArray.length}%`
    };
    return (
        <div className='game-board'>
            {playersArray.map((player) =>
            (
                <Game
                    key={player.email}
                    player={player}
                    setPlayersArray={setPlayersArray}
                    columnWidth={calculateColumnWidth()}
                    playersArray={playersArray}
                    setTopLeaders={setTopLeaders}
                />
            )
            )}
        </div>
    )
}

export default GameBoard