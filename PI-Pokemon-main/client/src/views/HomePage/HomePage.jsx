import  { useEffect, useState } from 'react';
import CardContainer from '../../components/CardContainer/CardContainer';
import { useSelector, useDispatch } from 'react-redux';
import { allPokemons,setFilterByType,setFilterByOrigin,orderByAttack, orderByName,allTypes } from '../../redux/actions';
import styles from "../HomePage/HomePage.module.css";
import Nav from "../../components/Nav/Nav";
import Paginado from '../../components/Paginado/Paginado';
import running from "../../Imagenes/running.gif";

const HomePage = () => {
  const dispatch = useDispatch();
 

  const todosPokemons= useSelector((state)=> state.pokemons);
  //console.log(todosPokemons);

  //orden y filtros
  const types= useSelector((state)=> state.alTypes);
  const [order,setOrder] = useState("");
  const [areTypesLoaded, setAreTypesLoaded] = useState(false); // Nuevo estado

  
   const [isLoading, setIsLoading] = useState(true); // Estado para el indicador de carga

   //paginado
         const [currentPage,setCurrentPage] = useState(1); //currentPage=estado con la pagina actual y el otro estado(setCurrentPage) que setee la pagina actual
         const [charactersPerPage,setCharactersPerPage]= useState(12)// setea cuantas cartas quiero por pagina
         const indexOfLastCharacter = currentPage * charactersPerPage // indice del ultimo personaje que yo tengo en la pagina
         const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; //indice del primer personaje
         const currentCharacters= todosPokemons?.slice(indexOfFirstCharacter,indexOfLastCharacter) //personajes que estan en la pagina actual
     
         const paginado = (pageNumber)=>{ //ayuda al renderizado
           setCurrentPage(pageNumber)
         }
  
    //fin del paginado
    
    useEffect(() => {
      // Cuando la página se carga, establece isLoading en true
      setIsLoading(true);
    
      // Realiza la llamada a la API para obtener todos los tipos primero
      dispatch(allTypes())
        .then(() => {
          // Después de que los tipos se hayan cargado con éxito, realiza la llamada a la API para obtener todos los Pokémon
          return dispatch(allPokemons());
        })
        .then(() => {
          // Cuando ambas llamadas a la API hayan respondido con éxito, establece isLoading en false
          setIsLoading(false);
          setAreTypesLoaded(true);
        })
        .catch((error) => {
          // Manejo de errores si alguna de las llamadas a la API falla
          console.error('Error al cargar los datos:', error);
          setIsLoading(false); // Asegúrate de establecer isLoading en false incluso en caso de error
        });
    }, [dispatch]);

    // FILTRADO POR TYPE
    const handleTypeFilter = (event) => {
      
      dispatch(setFilterByType(event.target.value));
    };
    // filtrado por api o db
    const handleFilterOrigin = (event) => {
      const filterValue = event.target.value;
      
      dispatch(setFilterByOrigin(filterValue));
    };
    // ORDEN POR ATTACK
  const handleOrderByAttack = (event) => {
    const orderValue = event.target.value;
    dispatch(orderByAttack(orderValue));
    setOrder(`Ordenado ${orderValue}`);
  };
  // ORDEN POR NAME
  const handleOrderByName = (event) => {
    const orderValue = event.target.value;
    dispatch(orderByName(orderValue));
    setOrder(`Ordenado ${orderValue}`);
  };
         


  return (
    <div className={styles.contenedor}>
      <Nav />
      {isLoading ? ( // Mostrar la pantalla de carga mientras isLoading sea true
        <div> 
          <h1 className={styles.load}>Loading Pokemons...</h1>
          <img src= {running} alt="Imagen"/>
        </div>
      ) : (
        <div className={styles.divcart}>
          <div>
            {/* Selección de ordenar */}
            <select className={styles.select} onChange={(event) => handleOrderByName(event)}>
              <option value="Ascendant" className={styles.optiona}>A-Z</option>
              <option value="Descendant" className={styles.optiona}>Z-A</option>
            </select>
  
            {/* Selección de filtrar por tipo */}
            <select
              className={styles.select}
              onChange={handleTypeFilter}
              disabled={!areTypesLoaded} // Deshabilita el filtro hasta que los tipos estén cargados
            >
              
              <option value="All" className={styles.optiona}>All TYPES</option>
              {types &&
                types.map((tipo) => (
                  <option key={tipo.id} value={tipo.name} className={styles.optiona}>
                    {tipo.name}
                  </option>
                ))}
            </select>
  
            {/* Selección de ordenar por ataque */}
            <select onChange={(event) => handleOrderByAttack(event)} className={styles.select}>
             <option value="" className={styles.optiona} >All ATTACK</option>
              <option value="Attack-ASC" className={styles.optiona}>Ascending attack</option>
              <option value="Attack-DESC" className={styles.optiona}>Descending attack</option>
            </select>
  
            {/* Selección de filtrar por origen */}
            <select  onChange={(event) => handleFilterOrigin(event)} className={styles.select}>
              <option value="All" className={styles.optiona} >All ORIGIN</option>
              <option value="DataBase" className={styles.optiona}>Data Base</option>
              <option value="Api" className={styles.optiona}>Api</option>
            </select>
          </div>
  
          <section className={styles.section}>
            <CardContainer currentCharacters={currentCharacters} />
          </section>
  
          <Paginado
            charactersPerPage={charactersPerPage}
            todosPokemons={todosPokemons?.length}
            paginado={paginado}
          />
        </div>
      )}
    </div>
  );
}
export default HomePage;