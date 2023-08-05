import "../Style/ProductCard.css"

export const ProductCard = ({data}) => {
    // console.log(data)
  return (
    <div className="ProCont">
            <img src={data.image}/>
            <h3>{data.title}</h3>
            <p>{data.desc}</p>
            <h3>${data.price}</h3>
    </div>
  )
}
