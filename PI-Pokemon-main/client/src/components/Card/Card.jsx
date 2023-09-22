import { NavLink } from "react-router-dom";

const Card = ({id,name,image,types})=>{

    if (!(typeof types[0]=== "string")){
        for(let i = 0; i<types.length;i++){
            types[i]= types[i].name
        }
    }
    return (
        <div>
            <h2>{name}</h2>

            <NavLink to={`/detail/${id}`}> 
              <img src={image} alt={name}/>
            </NavLink>
           <div>
                {
                    types.map(type=>{
                        return (
                            <h3>{type}</h3>
                        )
                    })
                }
           </div>
        
        </div>
    );
}

export default Card;