// src/App.jsx
import React from 'react'
import { HashRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Nosotros from './components/Nosotros'
import Cervezas from './components/Cervezas'
import Bar from './components/Bar'
import Ubicacion from './components/Ubicacion'
import Footer from './components/Footer'
import './App.css'
import './colors.css'

function App() {
    return (
        <HashRouter>
            <header>
                <Navbar />
            </header>

            <main>
                <section id="hero">
                    <Hero />
                </section>
                <section id="nosotros">
                    <Nosotros />
                </section>
                <section id="cervezas">
                    <Cervezas />
                </section>
                <section id="bar">
                    <Bar />
                </section>
                <section id="ubicacion">
                    <Ubicacion />
                </section>
            </main>

            <Footer />
        </HashRouter>
    )
}

export default App