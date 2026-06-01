import React, { useState, useEffect } from 'react';
import './BeerStatsTable.css';

const MEDAL_SYMBOLS = {
    oro: '🥇',
    plata: '🥈',
    bronce: '🥉'
};

const MEDAL_LABELS = {
    oro: 'oro',
    plata: 'plata',
    bronce: 'bronce'
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

const SWATCH_DESCRIPTION_BY_MODIFIER = {
    dp: 'Color dorado de la Dorada Pampeana',
    ga: 'Color ámbar claro de la Ginger Ale',
    ipa: 'Color ámbar profundo de la IPA',
    ira: 'Color rojizo de la Irish Red Ale',
    stt: 'Color oscuro de la Stout',
    default: 'Color representativo del estilo'
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

    return medalString || ' ';
};

const buildMedalDescription = (premios) => {
    if (!premios || typeof premios !== 'object') {
        return 'Sin medallas registradas';
    }

    const parts = [];

    ['oro', 'plata', 'bronce'].forEach(tier => {
        const entries = Array.isArray(premios[tier]) ? premios[tier] : [];
        const count = entries.length;
        if (count) {
            const label = MEDAL_LABELS[tier] ?? tier;
            const suffix = count > 1 ? 's' : '';
            parts.push(`${count} medalla${suffix} de ${label}`);
        }
    });

    return parts.length ? parts.join(', ') : 'Sin medallas registradas';
};

const resolveSwatchModifier = (nombre = '') => {
    const normalized = nombre.trim().toLowerCase();
    return SWATCH_CLASS_BY_NAME[normalized] ?? 'default';
};

const describeSwatch = (modifier, nombre) => {
    if (modifier in SWATCH_DESCRIPTION_BY_MODIFIER) {
        return SWATCH_DESCRIPTION_BY_MODIFIER[modifier];
    }
    const safeName = nombre ? nombre : 'este estilo';
    return `Color representativo de ${safeName}`;
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
                <caption className="sr-only">
                    Resumen de estilos de cerveza con premios obtenidos, graduación alcohólica, nivel de amargor y color de referencia.
                </caption>
                
                <thead>
                    <tr>
                        <th scope="col">Estilo</th>
                        <th scope="col">Premios</th>
                        <th scope="col">ABV (Grad. alcohol)</th>
                        <th scope="col">IBU (Amargor)</th>
                        <th scope="col">Color</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, nombre, premios, abv, ibu }, idx) => {
                        const medalDisplay = buildMedalString(premios);
                        const medalDescription = buildMedalDescription(premios);
                        const swatchModifier = resolveSwatchModifier(nombre);
                        const swatchDescription = describeSwatch(swatchModifier, nombre);
                        return (
                            <tr key={id ?? `${nombre}-${idx}`}>
                                <th scope="row">{nombre}</th>
                                <td>
                                    <span aria-hidden="true">{medalDisplay}</span>
                                    <span className="sr-only">{medalDescription}</span>
                                </td>
                                <td>{abv}%</td>
                                <td>{ibu}</td>
                                <td>
                                    <span
                                        className={`beer-stats-table__swatch beer-stats-table__swatch--${swatchModifier}`}
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{swatchDescription}</span>
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