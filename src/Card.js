export const Card = ({card}) => {
    return (
    <div className="card">
        <p>{card.suit}</p>
        <p>{card.value}</p>
    </div>
    )
}
