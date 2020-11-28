import '../styles/Card.css'

export const Card = ({card}) => {
    return (
        <div className="playing-card">
            <img alt={"Playing Card"}
                 className="img playing-card-img"
                 src={process.env.PUBLIC_URL + `/assets/card-images/${card.value}${card.suit}.png`}/>
        </div>
    )
}
