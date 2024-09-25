import { Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import './style.css';

interface Props {
    isMobile?: boolean,
}

const Footer: React.FC<Props> = ({ isMobile }) => {


    const lettersArray = ['A', 'N'];


    const [trail, setTrail] = useState<{ letter: string; left: number; top: number }[]>([]);
    const isGenerating = useRef(false); // Ref per impedire più sequenze

    const handleMouseMove = (event: React.MouseEvent) => {
        // Se una sequenza è già in corso, non fare nulla


        isGenerating.current = true;
        let index = 0;

        const interval = setInterval(() => {


            setTrail((prev) => [
                ...prev,
                {
                    letter: lettersArray[index],
                    left: event.clientX + Math.random() * 100 - 25,
                    top: event.clientY,
                },
            ]);

            index++;

            if (index >= lettersArray.length) {
                clearInterval(interval);
                isGenerating.current = false; // Permetti la generazione di una nuova sequenza
            }
        }, 300);
    };

    // Rimuovi le lettere più vecchie dopo 2 secondi per evitare sovrapposizioni eccessive
    React.useEffect(() => {
        const cleanup = setInterval(() => {
            setTrail((prev) => prev.slice(lettersArray.length)); // Mantiene solo l'ultima sequenza di lettere
        }, 2000);

        return () => clearInterval(cleanup);
    }, [trail]);
    return (
        <footer style={{ backgroundColor: '#EC3118', padding: '24px 24px 0 24px' }}>
            <section className="mb-24 ">
                <Grid container style={{}} className="">
                    <Grid item xs={6}>
                        <h4>Contatti</h4>
                    </Grid>
                    <Grid style={{ paddingLeft: '24px' }} item xs={6}>

                        <h4 className='mb-8'>Hai un progetto in mente?</h4>

                        <p className='link'>Manda una mail a <a className='link' href='mailto:hello@andreadominici.com' aria-label="Mandami una mail">hello@andreadominici.com</a> </p>
                    </Grid>
                </Grid>

            </section>
            <section className="trail-section" onMouseMove={handleMouseMove}>
                {trail.map((item, index) => (
                    <span
                        key={index}
                        className="trail-letter"
                        style={{
                            left: `${item.left}px`,
                            top: `${item.top}px`,
                        }}
                    >
                        {item.letter}
                    </span>
                ))}
            </section>
            <section style={{ padding: ' 24px 0', borderTop: '1px solid rgba(0, 0, 0, 0.2)' }} className=" ">
                <Grid container style={{}} className="">
                    <Grid style={{ display: 'flex', gap: '24px' }} item xs={6}>
                        <p className='caption'>© Andrea Dominici</p>
                        <p className='caption'>P.IVA: 03918130125</p>
                    </Grid>
                    <Grid style={{ paddingLeft: '24px' }} item container xs={6}>
                        <Grid style={{ display: 'flex', gap: '24px' }} item xs={6}>

                            <p className='caption'>Instagram</p>
                            <p className='caption'>Linkedin</p>
                            <p className='caption'>Pinterest</p>

                        </Grid>

                        <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={6}>

                            <p className='caption'>Tutti i diritti riservati</p>

                        </Grid>
                    </Grid>
                </Grid>

            </section>
        </footer>
    );
};



export default Footer;
