import { NavLink } from "react-router-dom";

const Card = ({id,name,image,types})=>{
    return (
        <div>
            <h2>{name}</h2>

            <NavLink to={`/detail/${id}`}> 
              <img src={image}/>
            </NavLink>
           <div>
            <h3>{types[0]}</h3>
            <h3>{types[1]}</h3>
           </div>
        
        </div>
    );
}

export default Card;
