import React from "react";
import styles from "../Paginado/Paginado.module.css";

export default function Paginado({ charactersPerPage, todosPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(todosPokemons / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.contnav}>
      <ul className={styles.list}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            
              <button onClick={() => paginado(number)}>{number}</button>
           
          ))}
      </ul>
    </nav>
  );
}