const Ubicacion = () => {
    return (
        <section className="ubicacion-section">

            <iframe
                title="Taura Cerveza Artesanal - mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.575003883889!2d-57.921068!3d-34.9171135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e71f7b54b003%3A0xb15812f04f7b53a8!2sTaura%20Cerveza%20Artesanal!5e0!3m2!1ses!2sar!4v1750690888920!5m2!1ses!2sar"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />

        </section>
    );
};

export default Ubicacion;