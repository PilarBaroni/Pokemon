import Search from "../Search/Search.jsx";
import { NavLink } from "react-router-dom";

const Nav=()=>{

    return(
        <nav >

                 <button >
                  <NavLink  to="/home">Home🏠︎</NavLink>
                </button>
                
                <button >
                  <NavLink  to="/form">Crear Pokemon</NavLink>
                </button>

             <Search />

              <button >
                 <NavLink  to="/about">About❆</NavLink>
              </button>
        </nav>
    )
}
export default Nav;