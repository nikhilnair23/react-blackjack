import './card.css'
export const Card = ({card}) => {
    let img_url = card.value + card.suit + '.png';
    return (
    <div className=" mr-2">
        <img alt={"Playing Card"}
            className="img playing-card" src={process.env.PUBLIC_URL + `/assets/card-images/${card.value}${card.suit}.png`}/>
      {/*  <p>{card.suit}</p>
        <p>{card.value}</p>*/}
    </div>
    )
}
