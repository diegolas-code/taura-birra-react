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
        try { localStorage.setItem('theme', theme); } catch {}
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
                            className="theme-toggle theme-toggle-mobile"
                            onClick={() => { toggleTheme(); closeMenu(); }}
                            aria-pressed={theme === 'dark'}
                            title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                        >
                            {theme === 'dark' ? '☀️ Modo' : '🌙 Modo'}
                        </button>
                    </li>
                </ul>

                {/* toggle desktop: aislado a la derecha */}
                <button
                    className="theme-toggle theme-toggle-desktop"
                    onClick={toggleTheme}
                    aria-pressed={theme === 'dark'}
                    title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;