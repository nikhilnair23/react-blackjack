import {Game} from "../constants/gameConstants";
import '../styles/Controls.css'

export const Controls = ({gameState, hit, stay}) =>
    <>
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
    </>
