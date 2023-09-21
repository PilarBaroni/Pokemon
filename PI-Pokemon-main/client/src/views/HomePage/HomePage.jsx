import  { useEffect } from 'react';
import CardContainer from '../../components/CardContainer/CardContainer';
import { useSelector, useDispatch } from 'react-redux';
import { allPokemons,allTypes } from '../../redux/actions';

const HomePage = () => {
  const dispatch = useDispatch();

  const pokemons= useSelector((state)=> state.pokemons);
  // const types= useSelector((state)=> state.types);
  useEffect(()=>{
    dispatch(allPokemons());
    dispatch(allTypes());
  }, []);

  return (
    <div >
      <CardContainer pokemons={pokemons}/>
    </div>
  );
};


export default HomePage;