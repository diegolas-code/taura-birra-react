import React from 'react';
import BeerCard from './BeerCard';

const Cervezas = ({ items = [] }) => {
    return (
        <section className="cervezas-section">
            <div className="cervezas-container">
                <h2>Nuestras cervezas</h2>

                <div className="cervezas-grid">
                    {items.length === 0 ? (
                        <p>Cargando...</p>
                    ) : (
                        items.map((item, idx) => (
                            <BeerCard key={item.id ?? item.nombre ?? idx} item={item} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cervezas;