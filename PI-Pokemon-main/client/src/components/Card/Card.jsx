import { NavLink } from "react-router-dom";

const Card = ({id,name,image,types})=>{
    return (
        <div >
          
            <h1>Pokemons</h1>
          
          <div >

            <h1>{name}</h1>

          </div>

          <div >

            <img src={image} alt="pokemon pic"  />

          </div>

            <div>

              <h3>{types}</h3>
          
            <div>

              <button>
                <NavLink to={`/detail/${id}`}>
                  <h5>
                   info
                  </h5>
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      );
    };

export default Card;