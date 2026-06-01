import React, { useEffect, useRef, useState } from 'react';

const BeerCard = ({ item }) => {
    const img = item.imagen ? item.imagen.replace(/^\.\//, '/') : '';
    const cardRef = useRef(null);
    const [autoReveal, setAutoReveal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const computeShouldAutoReveal = () => {
        if (typeof window === 'undefined') return false;

        const { matchMedia, innerWidth } = window;
        let shouldReveal = innerWidth <= 900;

        if (typeof matchMedia === 'function') {
            try {
                const prefersNoHover = matchMedia('(hover: none)').matches;
                const coarsePointer = matchMedia('(pointer: coarse)').matches;
                const fineHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

                if (prefersNoHover || coarsePointer) {
                    shouldReveal = true;
                } else if (fineHover) {
                    shouldReveal = innerWidth <= 900;
                }
            } catch {
                shouldReveal = innerWidth <= 900;
            }
        }

        return shouldReveal;
    };

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const updateAutoReveal = () => {
            const nextValue = computeShouldAutoReveal();
            setAutoReveal((prev) => (prev === nextValue ? prev : nextValue));
        };

        updateAutoReveal();

        window.addEventListener('resize', updateAutoReveal);
        window.addEventListener('orientationchange', updateAutoReveal);

        return () => {
            window.removeEventListener('resize', updateAutoReveal);
            window.removeEventListener('orientationchange', updateAutoReveal);
        };
    }, []);

    useEffect(() => {
        const card = cardRef.current;

        if (!autoReveal || !card) {
            setIsVisible(false);
            return undefined;
        }

        if (typeof window === 'undefined') {
            setIsVisible(true);
            return undefined;
        }

        if (!('IntersectionObserver' in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === card) {
                        setIsVisible(entry.isIntersecting);
                    }
                });
            },
            {
                threshold: 0.25,
                rootMargin: '0px 0px -10% 0px',
            }
        );

        observer.observe(card);

        return () => {
            observer.disconnect();
        };
    }, [autoReveal]);

    // Función para verificar si tiene medallas
    const hasMedals = () => {
        if (!item.premios) return false;
        return (
            item.premios.oro?.length > 0 ||
            item.premios.plata?.length > 0 ||
            item.premios.bronce?.length > 0
        );
    };

    const revealContent = autoReveal && isVisible;
    const cardId = item.id ?? item.nombre ?? Math.random().toString(36).slice(2);
    const titleId = `beer-card-title-${cardId}`;
    const descId = `beer-card-desc-${cardId}`;
    const medalsId = `beer-card-medals-${cardId}`;

    const describedBy = hasMedals() ? `${descId} ${medalsId}` : descId;

    return (
        <article
            ref={cardRef}
            className={`beer-card${revealContent ? ' is-visible' : ''}`}
            tabIndex={0}
            role="group"
            aria-labelledby={titleId}
            aria-describedby={describedBy}
        >
            <img
                className="beer-card__img"
                src={img}
                alt={item.nombre}
                loading="lazy"
            />

            <div className="beer-card__overlay">
                <h4 className="beer-card__title" id={titleId}>{item.nombre}</h4>
                <p className="beer-card__desc" id={descId}>{item.descripcion}</p>
                
                {hasMedals() && (
                    <div className="beer-card__medals" id={medalsId}>
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