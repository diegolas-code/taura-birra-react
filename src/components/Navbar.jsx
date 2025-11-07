import React, { useState, useRef, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('theme') ||
                (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        } catch {
            return 'dark';
        }
    });

    const NAVBAR_HEIGHT = 70;
    const containerRef = useRef(null);

    const toggleMenu = () => setIsOpen(v => !v);
    const closeMenu = () => setIsOpen(false);

    const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    useEffect(() => {
        // aplica atributo data-theme en la raíz y guarda la preferencia
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch { }
    }, [theme]);

    const scrollWithOffset = (el) => {
        if (!el) return;
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -NAVBAR_HEIGHT;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    };

    useEffect(() => {
        if (!isOpen) return;

        const onClickOutside = (e) => {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target)) {
                closeMenu();
            }
        };

        const onKey = (e) => {
            if (e.key === 'Escape') closeMenu();
        };

        document.addEventListener('mousedown', onClickOutside);
        document.addEventListener('touchstart', onClickOutside);
        document.addEventListener('keydown', onKey);

        return () => {
            document.removeEventListener('mousedown', onClickOutside);
            document.removeEventListener('touchstart', onClickOutside);
            document.removeEventListener('keydown', onKey);
        };
    }, [isOpen]);

    return (
        <nav className="navbar" ref={containerRef}>
            <div className="navbar-container">
                <HashLink to="#top" className="navbar-logo" onClick={closeMenu} scroll={el => scrollWithOffset(el)}>
                    <span className='logo'>TAURA</span>
                </HashLink>

                <button
                    className="menu-toggle"
                    aria-label="Abrir menú"
                    onClick={toggleMenu}
                >
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                </button>

                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <HashLink to="/#hero" className="nav-link" onClick={closeMenu} scroll={el => scrollWithOffset(el)}>
                            Inicio
                        </HashLink>
                    </li>

                    <li className="nav-item">
                        <HashLink to="/#nosotros" className="nav-link" onClick={closeMenu} scroll={el => scrollWithOffset(el)}>
                            Nosotros
                        </HashLink>
                    </li>
                    <li className="nav-item">
                        <HashLink to="/#cervezas" className="nav-link" onClick={closeMenu} scroll={el => scrollWithOffset(el)}>
                            Cervezas
                        </HashLink>
                    </li>
                    <li className="nav-item">
                        <HashLink to="/#bar" className="nav-link" onClick={closeMenu} scroll={el => scrollWithOffset(el)}>
                            Bar de Fábrica
                        </HashLink>
                    </li>

                    <li className="nav-item">
                        <HashLink to="/#contacto" className="nav-link" onClick={closeMenu} scroll={el => scrollWithOffset(el)}>
                            Contacto
                        </HashLink>
                    </li>

                    {/* toggle móvil: aparece dentro del menú (después de los enlaces) */}
                    <li className="nav-item theme-toggle-mobile-wrap">
                        <button
                            className="theme-switch theme-switch--mobile"
                            role="switch"
                            aria-checked={theme === 'dark'}
                            onClick={() => { toggleTheme(); closeMenu(); }}
                            title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                        >
                            <span className="theme-switch__track" aria-hidden="true">
                                {/* Sun SVG */}
                                <span className="theme-switch__icon theme-switch__icon--sun" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                                        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                            <line x1="12" y1="1.5" x2="12" y2="4.5" />
                                            <line x1="12" y1="19.5" x2="12" y2="22.5" />
                                            <line x1="1.5" y1="12" x2="4.5" y2="12" />
                                            <line x1="19.5" y1="12" x2="22.5" y2="12" />
                                            <line x1="4.2" y1="4.2" x2="6.1" y2="6.1" />
                                            <line x1="17.9" y1="17.9" x2="19.8" y2="19.8" />
                                            <line x1="4.2" y1="19.8" x2="6.1" y2="17.9" />
                                            <line x1="17.9" y1="6.1" x2="19.8" y2="4.2" />
                                        </g>
                                    </svg>
                                </span>

                                <span className="theme-switch__thumb" />

                                {/* Moon SVG */}
                                <span className="theme-switch__icon theme-switch__icon--moon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                            <span className="sr-only">{theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}</span>
                        </button>
                    </li>
                </ul>

                {/* toggle desktop: aislado a la derecha */}
                <button
                    className="theme-switch theme-switch--desktop"
                    role="switch"
                    aria-checked={theme === 'dark'}
                    onClick={toggleTheme}
                    title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                >
                    <span className="theme-switch__track" aria-hidden="true">
                        <span className="theme-switch__icon theme-switch__icon--sun" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                <circle cx="12" cy="12" r="4" fill="currentColor" />
                                <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <line x1="12" y1="1.5" x2="12" y2="4.5" />
                                    <line x1="12" y1="19.5" x2="12" y2="22.5" />
                                    <line x1="1.5" y1="12" x2="4.5" y2="12" />
                                    <line x1="19.5" y1="12" x2="22.5" y2="12" />
                                    <line x1="4.2" y1="4.2" x2="6.1" y2="6.1" />
                                    <line x1="17.9" y1="17.9" x2="19.8" y2="19.8" />
                                    <line x1="4.2" y1="19.8" x2="6.1" y2="17.9" />
                                    <line x1="17.9" y1="6.1" x2="19.8" y2="4.2" />
                                </g>
                            </svg>
                        </span>

                        <span className="theme-switch__thumb" />

                        <span className="theme-switch__icon theme-switch__icon--moon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                            </svg>
                        </span>
                    </span>
                    <span className="sr-only">{theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;