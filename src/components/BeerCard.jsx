import React from 'react';

const BeerCard = ({ item }) => {
    const img = item.imagen ? item.imagen.replace(/^\.\//, '/') : '';

    return (
        <article
            className="beer-card"
            aria-label={item.nombre}
        >
            <img
                className="beer-card__img"
                src={img}
                alt={item.nombre}
                loading="lazy"
            />

            <div className="beer-card__overlay">
                <h3 className="beer-card__title">{item.nombre}</h3>
                <p className="beer-card__desc">{item.descripcion}</p>
            </div>
        </article>
    );
};

export default BeerCard;