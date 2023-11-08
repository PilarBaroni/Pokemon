import Card from "../Card/Card";
import style from "../CardContainer/CardContainer.module.css";
const CardContainer = ({ currentCharacters})=>{

    return (
        <div className={style.cartitas}>
            {
                currentCharacters?.map((pokemon)=>{
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
