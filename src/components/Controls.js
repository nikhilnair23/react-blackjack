import {Game} from "../constants";
import '../styles/App.css'

export const Controls = ({gameState, hit, stay, startGame, reset}) =>
    <>
        <div className="control-space mb-2">
            {gameState === Game.STARTED &&
            <>
                <div className="circle-btn green mr-6"
                     onClick={hit}
                >
                    HIT
                </div>
                <div className="circle-btn red"
                     onClick={stay}
                >
                    STAY
                </div>
            </>
            }
        </div>


    </>
