import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

interface Props {
    children: React.ReactNode;
    orientation: 'horizontal' | 'vertical';
    duration: number;
}

const LenisWrapper: React.FC<Props> = ({ children, orientation = 'vertical', duration }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    console.log('scrollRef', scrollRef);


    useEffect(() => {
        if (!scrollRef.current) return;

        const lenis = new Lenis({
            orientation: orientation,    // Imposta lo scroll (verticale o orizzontale)
            duration: duration,          // Durata dello scroll fluido

            smoothWheel: true,           // Ottimizza lo scroll della rotella
            // Puoi attivare/disattivare lo scroll touch liscio
        });

        lenis.on('scroll', ({ scroll, limit }) => {
            console.log(`Scroll position: ${scroll}, Limit: ${limit}`);
            // Verifica se sei arrivato in fondo (scroll == limit)
            if (scroll >= limit) {
                console.log(' Scroll Hai raggiunto la fine dello scroll!');
            }
        });


        let animationFrameId: number;

        function raf(time: any) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }

        // Forza un primo ciclo di animazione per evitare il lag iniziale
        lenis.raf(0); // Esegui subito il primo ciclo di raf per avviare l'animazione
        animationFrameId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy(); // Cleanup
            cancelAnimationFrame(animationFrameId); // Ferma il ciclo di animazione
        };
    }, [orientation, duration]);

    return (
        <div ref={scrollRef}>
            {children}
        </div>
    );
}

export default LenisWrapper;
