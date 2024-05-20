import React, { useEffect, useState } from 'react'

const Game = ({ player, setPlayersArray, columnWidth, playersArray, setTopLeaders }) => {

    const [randomNumber, setRandomNumber] = useState(0);
    const [steps, setSteps] = useState(0);
    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 99) + 1)
    }, [])

    useEffect(() => {
        if (randomNumber === 100) {
            updatePlayerScores();
            setTopLeaders();
        }
    }, [randomNumber]);

    const handleClickAction = (action) => {
        let randomNumberPlayer;
        setSteps(prevSteps => prevSteps + 1);
        switch (action) {
            case "plus":
                setRandomNumber(prevRandomNumber => prevRandomNumber + 1);
                randomNumberPlayer = randomNumber + 1;
                break;
            case "minus":
                setRandomNumber(prevRandomNumber => prevRandomNumber - 1);
                randomNumberPlayer = randomNumber - 1;
                break;
            case "duplicate":
                setRandomNumber(prevRandomNumber => prevRandomNumber * 2);
                randomNumberPlayer = randomNumber * 2;
                break;
            case "devision":
                setRandomNumber(prevRandomNumber => Math.floor(prevRandomNumber / 2));
                randomNumberPlayer = randomNumber / 2;
                break;
        }
        if (randomNumberPlayer != 100) {
            nextPlayer();
        }
    }
    const nextPlayer = () => {
        let userEmail = localStorage.getItem("currentUser");
        let updatedArray = [...playersArray];
        let index;
        for (let i = 0; i < playersArray.length; i++) {
            if (updatedArray[i].email === userEmail) {
                updatedArray[i].enable = false;
                index = playersArray.length <= i + 1 ? 0 : i + 1;
                updatedArray[index].enable = true;
                localStorage.setItem(updatedArray[index].email, JSON.stringify(updatedArray[index]));
                localStorage.setItem(userEmail, JSON.stringify(updatedArray[i]));
                localStorage.setItem("currentUser", updatedArray[index].email)
                break;
            }
        }
        setPlayersArray(updatedArray);
    }
    const updatePlayerScores = () => {
        let userEmail = localStorage.getItem("currentUser");
        let updatedArray = [...playersArray];
        for (let i = 0; i < playersArray.length; i++) {
            if (updatedArray[i].email === userEmail) {
                updatedArray[i].scores.push(steps);
                localStorage.setItem(userEmail, JSON.stringify(updatedArray[i]));
            }
        }
        setPlayersArray(updatedArray);
    }

    const handleClickQuit = () => {
        let userEmail = localStorage.getItem("currentUser");
        let updatedArray = [...playersArray];
        let indexToRemove = updatedArray.findIndex(player => player.email === userEmail);
        if (indexToRemove !== -1) {
            if (updatedArray.length > 1) {
                let newIndex = indexToRemove == ((playersArray.length) - 1) ? 0 : indexToRemove + 1;
                localStorage.setItem("currentUser", updatedArray[newIndex].email);
                updatedArray[newIndex].enable = true;
                localStorage.setItem(updatedArray[newIndex].email, JSON.stringify(updatedArray[newIndex]));
            }
            updatedArray[indexToRemove].enable = false;
            localStorage.setItem(updatedArray[indexToRemove].email, JSON.stringify(updatedArray[indexToRemove]));
            updatedArray.splice(indexToRemove, 1);
        }
        setPlayersArray(updatedArray);
    }

    const handleClickNewGame = () => {
        nextPlayer();
        setRandomNumber(Math.floor(Math.random() * 99) + 1);
        setSteps(0);
    }
    let count = 0;
    return (
        <div className='singleGame' style={{ width: columnWidth, filter: player.enable ? 'none' : 'blur(1px)' }}>
            <h2>Get to 100!</h2>
            <p>Name: {player.name}</p>
            <p className="randomNumber">Number: {randomNumber}</p>
            <p>Steps: {steps}</p>
            {randomNumber === 100 ? (
                <div>
                    <button className="btnAction" onClick={handleClickNewGame}>New Game</button>
                    <button className="btnAction" onClick={handleClickQuit}>Quit</button><br />
                <br /></div>
            ) : (
                <div className="btnActions">
                    <button disabled={!player.enable} className="plus btnAction" onClick={() => handleClickAction('plus')}>
                        +1
                    </button>
                    <button disabled={!player.enable} className="minus btnAction" onClick={() => handleClickAction('minus')}>
                        -1
                    </button>
                    <button disabled={!player.enable} className="duplicate btnAction" onClick={() => handleClickAction('duplicate')}>
                        *2
                    </button>
                    <button disabled={!player.enable} className="devision btnAction" onClick={() => handleClickAction('devision')}>
                        /2
                    </button>
                </div>
            )}
            <p>{`${player.name}'s scores: `}
                {player.scores.map((score) => (
                    <span key={count++}>{score},</span>
                ))}
            </p>
        </div>
    )
}

export default Game