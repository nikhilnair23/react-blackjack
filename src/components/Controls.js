import {Game} from "../constants";
import '../styles/App.css'

export const Controls = ({gameState, hit, stay, startGame, reset}) =>
    <>
        <div className="control-space mb-2">
            {gameState === Game.STARTED &&
            <>
                <div className="btn btn-success mr-2"
                     onClick={hit}
                >
                    HIT
                </div>
                <div className="btn btn-danger"
                     onClick={stay}
                >
                    STAY
                </div>
            </>
            }
        </div>
        <div className="d-flex flex-row justify-content-center">
            {gameState === Game.INIT ?
                <div className="btn btn-primary"
                     onClick={startGame}
                >
                    Start Game
                </div>
                :
                <div className="btn btn-primary"
                     onClick={reset}
                >
                    Restart
                </div>
            }
        </div>
    </>
