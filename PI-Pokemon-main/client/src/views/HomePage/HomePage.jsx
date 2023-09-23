import  { useEffect, useState } from 'react';
import CardContainer from "../../components/CardContainer/CardContainer"
import {  useDispatch } from 'react-redux';
import { allPokemons } from '../../redux/actions';


const HomePage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);                 // CON ESTE ETSADO SABEMOS SI TODAVIA SE ESTA HACIENDO LA SOLICITUS PARA RECIBBIR LOS POKEMONS
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(allPokemons());
      setLoading(false);
    };
    
    fetchData();
  }, [dispatch]);

  
  return (
    <div >
      {loading ? (
        <div >
          <h1>Loading Pokémons...</h1>
        </div>
      ) : (
        <CardContainer />
      )}
    </div>
  );
};


export default HomePage;