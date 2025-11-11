const Footer = () => {
    return (
        <footer id="contacto">
            <div className="footer-container">

                <div>
                    <h3>Cómo encontrarnos</h3>
                    <ul>
                        <li>Calle 68 y 119, La Plata (Buenos Aires, Argentina)</li>
                        <li>+54 9 221 552 1152</li>
                        <li><a href="mailto:cervezataura@gmail.com">cervezataura@gmail.com</a></li>
                    </ul>
                </div>

                <div>
                    <h3>Nuestras redes</h3>
                    <ul className="redes">
                            <li><a
                                    href="https://www.facebook.com/tauracerveza">/tauracerveza</a></li>
                            <li><a
                                    href="https://www.instagram.com/cervezataura">/cervezataura</a></li>
                        </ul>
                </div>

                <div>
                    <h3>Contactanos</h3>

                    <form action="https://formspree.io/f/xvgrvbpz" method="POST">
                        <label>
                            Tu correo electrónico:
                            <input type="email" className="flat-input" name="email" />
                        </label>
                        <label>
                            Tu mensaje:
                            <textarea name="message" className="flat-input"></textarea>
                        </label>
                        <button className="btn btn-brn" type="submit">Enviar mensaje</button>
                    </form>

                </div>

            </div>

            

            <p><span className="signature">Desarrollado por Diegolas Web Labs © 2025</span></p>

            <div className="separator"></div>
        </footer>
    );
};

export default Footer;