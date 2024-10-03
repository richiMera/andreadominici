import { Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import './style.css';

interface Props {
    isMobile?: boolean,
}

const Footer: React.FC<Props> = ({ isMobile }) => {






    const boxes = Array.from({ length: 72 }); // Creiamo 64 box
    const letters = ['A', 'N', 'D', 'R', 'E', 'A']; // Lettere che formano "ANDREA"

    // Stato per tenere traccia di quale box è hoverato
    const [hoveredBox, setHoveredBox] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setHoveredBox(index);  // Quando il mouse entra nel box, aggiorna lo stato
    };

    const handleMouseLeave = () => {
        setHoveredBox(null);  // Quando il mouse esce, resetta lo stato
    };


    // Rimuovi le lettere più vecchie dopo 2 secondi per evitare sovrapposizioni eccessive
    React.useEffect(() => {

    }, []);
    return (
        <footer style={{ backgroundColor: '#EC3118', padding: '24px 24px 0 24px', height: '100svh' }}>
            <section style={{ height: '10%' }} className="-mb-24 ">
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
            {/* <section className="trail-section" >
                { }
            </section> */}
            <Grid container sx={{ width: '100%', height: '80%' }}>
                {boxes.map((_, index) => {

                    return (
                        <Grid
                            item
                            key={index}
                            xs={1} // Ogni box occupa 1/12
                            sx={{
                                position: 'relative',
                                aspectRatio: '2/1',

                                display: 'flex',
                                alignItems: 'center',

                                '&:hover': {
                                    cursor: 'pointer', // Mostra il cursore a mano
                                },
                            }}
                            onMouseEnter={() => handleMouseEnter(index)}  // Setta lo stato al passaggio del mouse
                            onMouseLeave={handleMouseLeave}               // Resetta lo stato al termine dell'hover
                        >
                            {/* Se il box è hoverato, mostra una lettera */}
                            {hoveredBox === index && (
                                <p className='trail-letter'

                                    style={{
                                        position: 'absolute',
                                        color: 'black',
                                        transition: 'opacity 0.3s ease',
                                    }}
                                >
                                    {/* Usa l'indice per selezionare una lettera dall'array */}
                                    {letters[index % letters.length]}
                                </p>
                            )}
                        </Grid>
                    );
                })}
            </Grid>
            <section style={{ padding: ' 24px 0', borderTop: '1px solid rgba(0, 0, 0, 0.2)', height: '10%' }} className=" ">
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
