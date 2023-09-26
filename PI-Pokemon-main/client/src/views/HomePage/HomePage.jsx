import  { useEffect, useState } from 'react';
import CardContainer from '../../components/CardContainer/CardContainer';
import { useSelector, useDispatch } from 'react-redux';
import { allPokemons,filterTypes } from '../../redux/actions';


const HomePage = () => {
  const dispatch = useDispatch();
 

  const pokemons= useSelector((state)=> state.pokemons);
  // const types= useSelector((state)=> state.types);

   // Agrega estado para el origen (API o DB)
   const [origin, setOrigin] = useState("ALL"); // Inicialmente, muestra todos los Pokémon
    const [isLoading, setIsLoading] = useState(true); // Estado para el indicador de carga
    useEffect(() => {
      // Cuando la página se carga, establece isLoading en true
      setIsLoading(true);
  
      // Realiza la llamada a la API
      dispatch(allPokemons())
        .then(() => {
          // Cuando la API haya respondido con éxito, establece isLoading en false
          setIsLoading(false);
        })
        .catch((error) => {
          // Manejo de errores si la llamada a la API falla
          console.error('Error al cargar los datos:', error);
          setIsLoading(false); // Asegúrate de establecer isLoading en false incluso en caso de error
        });
    }, [dispatch]);
  

  const handleFilter=(event)=>{
    dispatch(filterTypes(event.target.value));
  };
const handleOriginChange = (event) => {
  setOrigin(event.target.value);
  };
  return (
    <div>
      {isLoading ? ( // Mostrar la pantalla de carga mientras isLoading sea true
        <div>Loading Pokemons...</div>
      ) : (
        <div>
          <div>
            <select onChange={handleFilter}>
              <option value="ALL">All Pokemons</option>
              <option value="normal">Normal</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="rock">Rock</option>
              <option value="bug">Bug</option>
              <option value="ghost">Ghost</option>
              <option value="steel">Steel</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="Grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="Psychic">Psychic</option>
              <option value="ice">Ice</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="fairy">Fairy</option>
              <option value="unknown">Unknown</option>
              <option value="shadow">Shadow</option>
            </select>
          </div>
          <div>
            <select onChange={handleOriginChange} value={origin}>
              <option value="ALL">All Origins</option>
              <option value="API">API</option>
              <option value="DB">DB</option>
            </select>
          </div>
          <CardContainer pokemons={pokemons} />
        </div>
      )}
    </div>
  );
};

export default HomePage;