import './card.css'

export const Card = ({card}) => {
    return (
        <div className="card">
            <img alt={"Playing Card"}
                 className="img playing-card"
                 src={process.env.PUBLIC_URL + `/assets/card-images/${card.value}${card.suit}.png`}/>
        </div>
    )
}
