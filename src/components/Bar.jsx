import { useEffect, useRef } from 'react';

const Bar = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section.classList.add('in-view');
                    } else {
                        section.classList.remove('in-view');
                    }
                });
            },
            {
                threshold: 0.3, // cambiar de 100 a 0.5 (50% de visibilidad)
                rootMargin: '-25% 0px -25% 0px' // Detecta cuando está en el centro vertical
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={sectionRef} className="bar-section">
            <div className="bar-container">
                <h2>Bar de Fábrica</h2>

                <p>
                    Los sábados, de 20:30 a 02:00, abrimos las puertas de nuestro Bar de Fábrica para que disfrutes una experiencia cervecera auténtica. Podés venir a probar todos nuestros estilos clásicos, junto con algunos experimentos exclusivos y sorpresas que solo servimos en el bar. Todo acompañado de comida casera hecha al momento, con opciones para todos los gustos, en un ambiente relajado, cálido y rodeado de buena música y buena gente.
                    <br /><br />
                    <small>(Solo con reserva previa)</small>
                </p>
            </div>
        </section>
    );
};

export default Bar;