import './card.css'
export const Card = ({card}) => {
    return (
    <div className="card playing-card mr-2">
        {/*<img className="img" src={require(`./assets/card-images/${card.suit}${card.value}.png`)}/>*/}
        <p>{card.suit}</p>
        <p>{card.value}</p>
    </div>
    )
}
