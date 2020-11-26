import './App.css';
import Deck from './Deck';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Card} from "./Card";




function App() {


  const[currDeck, setDeck] = useState(Deck.createDeck());
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameState, setGameState] = useState("init");

  return (
    <div className="App">

    </div>
  );
}

export default App;
