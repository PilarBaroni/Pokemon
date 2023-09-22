import Card from "../Card/Card";
import style from "../CardContainer/CardContainer.module.css";
const CardContainer = ({pokemons})=>{

    return (
        <div className={style.cartitas}>
            {
                pokemons?.map((pokemon)=>{
                    return (
                        <Card
                        key= {pokemon.id}
                        id= {pokemon.id}
                        name= {pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                        />
                    )
                })
            }

        </div>
    );
}

export default CardContainer;
