import React from "react";

export default function Paginado({ charactersPerPage, todosPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(todosPokemons / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <ul key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </ul>
          ))}
      </ul>
    </nav>
  );
}