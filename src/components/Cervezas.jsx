import React from 'react';

const Cervezas = ({ items = [] }) => {
    return (
        <section className="cervezas-section">
            <div className="cervezas-container">
                <h2>Nuestras cervezas</h2>

                <div className="cervezas-grid">
                    {items.length === 0 ? (
                        <p>Cargando...</p>
                    ) : (
                        items.map((item) => {
                            // si la ruta en JSON es "./imagen.png" la convertimos a "/imagen.png" para public/
                            const img = item.imagen ? item.imagen.replace(/^\.\//, '/') : '';
                            return (
                                <article
                                    key={item.id ?? item.nombre}
                                    className="beer-card"
                                    style={{ backgroundImage: `url(${img})` }}
                                    aria-label={item.nombre}
                                >
                                    <div className="beer-card__overlay">
                                        <h3 className="beer-card__title">{item.nombre}</h3>
                                        <p className="beer-card__desc">{item.descripcion}</p>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cervezas;