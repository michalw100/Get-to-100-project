import { useState } from 'react'
import SignUp from '../components/SignUp'
import LogIn from '../components/LogIn'
import GameBoard from '../components/GameBoard'
import TopPlayers from '../components/TopPlayers'
import './App.css'
import '../src/Game.css'


function App() {
  const [playersArray, setPlayersArray] = useState([]);//מערך השחקנים
  const [state, setState] = useState("signUp");//מערך המצבים
  const [hiddenRegistration, setHiddenRegistration] = useState("block");//הצגת מסך הפתיחה
  const [topLeaders, setTopLeaders] = useState([]);//עבור רנדןר מחדש של השיאים
  const startGame = () => {//פונקציה לאתחול המשחק בלחיצת new game
    setHiddenRegistration("none");
    let players = [...playersArray.map(item => ({ ...item }))];
    players[0].enable = true;
    localStorage.setItem("currentUser", players[0].email);
    localStorage.setItem(players[0].email, JSON.stringify(players[0]));
    setPlayersArray(players);
  }


  return (
    <div className='body'>
      <div className="registration" style={{ display: hiddenRegistration }}>
        <div className="start">
        {state == "signUp" && <><SignUp setPlayersArray={setPlayersArray}/><a className="link" onClick={() => setState("logIn")}>Already have an account? Sign in</a><br /><br /></>}
        {state == "logIn" && <><LogIn setPlayersArray={setPlayersArray} playersArray={playersArray} /><a className="link" onClick={() => setState("signUp")}>Don't have an account? Create account</a><br /><br /></>}
        </div>
        {state != "game" && playersArray.length > 0 && <button className='startGame' onClick={() => { setState("game"), startGame() }}>start game</button>}
      </div>
     
      {state == "game" && <><GameBoard setTopLeaders={setTopLeaders} playersArray={playersArray} setPlayersArray={setPlayersArray} /><div className='topPlayers'><TopPlayers/></div></>}
    </div>
  )
}

export default App
