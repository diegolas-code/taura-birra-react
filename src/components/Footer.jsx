const Footer = () => {
    return (
        <footer id="contacto">
            <div className="footer-container">

                <div>
                    <h3>Cómo encontrarnos</h3>
                    <ul>
                        <li>Calle 68 y 119, La Plata (Buenos Aires, Argentina)</li>
                        <li>+54 9 221 552 1152</li>
                        <li>cervezataura@gmail.com</li>
                    </ul>
                </div>

                <div>
                    <h3>Nuestras redes</h3>
                    <ul class="redes">
                        <li>Calle 68 y 119, La Plata (Buenos Aires, Argentina)</li>
                        <li>+54 9 221 552 1152</li>
                    </ul>
                </div>

                <div>
                    <h3>Contactanos</h3>

                    <form action="https://formspree.io/f/xvgrvbpz" method="POST">
                        <label>
                            Tu correo electrónico:
                            <input type="email" class="flat-input" name="email" />
                        </label>
                        <label>
                            Tu mensaje:
                            <textarea name="message" class="flat-input"></textarea>
                        </label>
                        <button class="btn btn-brn" type="submit">Enviar mensaje</button>
                    </form>

                </div>

            </div>
            <p><span className="signature">Desarrollado por Diegolas Web Labs © 2025</span></p>
        </footer>
    );
};

export default Footer;