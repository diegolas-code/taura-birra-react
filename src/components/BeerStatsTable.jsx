import React, { useState, useEffect } from 'react';
import './BeerStatsTable.css';

const MEDAL_SYMBOLS = {
    oro: '🥇',
    plata: '🥈',
    bronce: '🥉'
};

const SWATCH_CLASS_BY_NAME = {
    'dorada pampeana': 'dp',
    'ginger ale': 'ga',
    'ipa (indian pale ale)': 'ipa',
    'ipa': 'ipa',
    'ira (irish red ale)': 'ira',
    'ira': 'ira',
    'stout': 'stt'
};

const buildMedalString = (premios) => {
    if (!premios || typeof premios !== 'object') return '—';

    let medalString = '';
    
    // Orden: oro, plata, bronce
    const order = ['oro', 'plata', 'bronce'];
    
    order.forEach(tier => {
        if (Array.isArray(premios[tier]) && premios[tier].length > 0) {
            const symbol = MEDAL_SYMBOLS[tier];
            medalString += symbol.repeat(premios[tier].length);
        }
    });

    return medalString || '';
};

const resolveSwatchModifier = (nombre = '') => {
    const normalized = nombre.trim().toLowerCase();
    return SWATCH_CLASS_BY_NAME[normalized] ?? 'default';
};

const BeerStatsTable = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error cargando datos:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="cervezas-table-wrapper">
                <p className="beer-stats-table__empty">Cargando...</p>
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className="cervezas-table-wrapper">
                <p className="beer-stats-table__empty">No hay datos disponibles</p>
            </div>
        );
    }

    return (
        <div className="cervezas-table-wrapper">
            <table className="beer-stats-table">
                <thead>
                    <tr>
                        <th>Estilo</th>
                        <th></th>
                        <th>ABV (Grad. alcohol)</th>
                        <th>IBU (Amargor)</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, nombre, premios, abv, ibu }) => {
                        const medalDisplay = buildMedalString(premios);
                        const swatchModifier = resolveSwatchModifier(nombre);
                        return (
                            <tr key={id}>
                                <td>{nombre}</td>
                                <td>{medalDisplay}</td>
                                <td>{abv}%</td>
                                <td>{ibu}</td>
                                <td>
                                    <span className={`beer-stats-table__swatch beer-stats-table__swatch--${swatchModifier}`} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BeerStatsTable;