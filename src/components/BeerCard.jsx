import React from 'react';

const BeerCard = ({ item }) => {
    const img = item.imagen ? item.imagen.replace(/^\.\//, '/') : '';

    // Función para verificar si tiene medallas
    const hasMedals = () => {
        if (!item.premios) return false;
        return (
            item.premios.oro?.length > 0 ||
            item.premios.plata?.length > 0 ||
            item.premios.bronce?.length > 0
        );
    };

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
                <h4 className="beer-card__title">{item.nombre}</h4>
                <p className="beer-card__desc">{item.descripcion}</p>
                
                {hasMedals() && (
                    <div className="beer-card__medals">
                        {item.premios.oro?.length > 0 && (
                            <div className="medal-group">
                                <strong>Medalla de Oro</strong><br />
                                {item.premios.oro.map((premio, idx) => (
                                    <span key={idx}>
                                        {premio}
                                        {idx < item.premios.oro.length - 1 && <br />}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        {item.premios.plata?.length > 0 && (
                            <div className="medal-group">
                                <strong>Medalla de Plata</strong><br />
                                {item.premios.plata.map((premio, idx) => (
                                    <span key={idx}>
                                        {premio}
                                        {idx < item.premios.plata.length - 1 && <br />}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        {item.premios.bronce?.length > 0 && (
                            <div className="medal-group">
                                <strong>Medalla de Bronce</strong><br />
                                {item.premios.bronce.map((premio, idx) => (
                                    <span key={idx}>
                                        {premio}
                                        {idx < item.premios.bronce.length - 1 && <br />}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};

export default BeerCard;