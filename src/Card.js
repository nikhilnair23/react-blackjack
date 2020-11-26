import './card.css'
export const Card = ({card}) => {
    return (
    <div className="card playing-card mr-2">
        <p>{card.suit}</p>
        <p>{card.value}</p>
    </div>
    )
}
