function card({title, data}){
return(
<div className="weather-card" style={{display:'flex', flexDirection: 'column', alignItems: 'center', background: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width:280, height:140 }}>
<h3>{title}</h3>
<p>{data}</p>
</div>
)
}
export default card;