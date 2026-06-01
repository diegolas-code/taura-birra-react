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
                        <li>
                            <a
                                className="social-link social-link--facebook"
                                href="https://www.facebook.com/tauracerveza"
                            >
                                /tauracerveza
                            </a>
                        </li>
                        <li>
                            <a
                                className="social-link social-link--instagram"
                                href="https://www.instagram.com/cervezataura"
                            >
                                /cervezataura
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Contactanos</h3>

                    <form
                        action="https://formspree.io/f/xvgrvbpz"
                        method="POST"
                        aria-describedby="contact-form-guide"
                    >
                        <p id="contact-form-guide" className="form-instructions">
                            Todos los campos son obligatorios. Te responderemos a la brevedad.
                        </p>

                        <label htmlFor="contact-email">
                            Tu correo electrónico:
                        </label>
                        <input
                            id="contact-email"
                            type="email"
                            className="flat-input"
                            name="email"
                            required
                            aria-required="true"
                            autoComplete="email"
                        />

                        <label htmlFor="contact-message">
                            Tu mensaje:
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            className="flat-input"
                            required
                            aria-required="true"
                            aria-describedby="contact-form-guide"
                            minLength={10}
                        ></textarea>

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