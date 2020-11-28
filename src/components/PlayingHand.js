import {Game} from '../constants/gameConstants'
import {Card} from "./Card";
import '../styles/PlayingHand.css'

export const PlayingHand = ({gameState, hand, score}) =>
    <>
    {
    gameState !== Game.INIT &&
    <div className="d-flex flex-row justify-content-center">
        <div className="playing-hand">
            {hand.map((card, index) =>
                <Card key={index}
                      card={card}/>
            )}
        </div>
        <div className="float-right">
            <h3>Score: </h3>
            <div className="score">{score}</div>
        </div>
    </div>
    }
    </>
