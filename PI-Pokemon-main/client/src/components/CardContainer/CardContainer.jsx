import Card from "../Card/Card";

const CardContainer = ({pokemons})=>{

    return (
        <div>
            {
                pokemons.map((pokemon)=>{
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
