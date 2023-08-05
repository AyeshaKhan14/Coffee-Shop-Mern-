import load from "../assets/load.gif"

export const Loading = () => {
  return (
    <div style={{width:"600px",height:"200px", margin:"auto",marginTop:"160px",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <img src={load} />
    </div>
  )
}
