// import { useRef } from "react";
// import { motion } from "framer-motion";
// import './style.css';

// export const Example = () => {
//     const constraintsRef = useRef(null);

//     return (
//         <motion.div className="container" ref={constraintsRef}>
//             <motion.div
//                 className="item"
//                 drag="x" // Limita il drag solo in orizzontale
//                 dragConstraints={constraintsRef}
//                 whileTap={{ cursor: "grabbing" }} // Cambia il cursore durante il drag
//             >
//                 <div className="card"></div>
//                 <div className="card"></div>
//                 <div className="card"></div>
//                 <div className="card"></div>
//                 <div className="card"></div>
//             </motion.div>
//         </motion.div>
//     );
// };

import React from 'react';
import './style.css'; // Importa il CSS
import LenisWrapper from '../LenisWrapper';
import Card from '../Card';
import { Grid } from '@mui/material';



interface Props {

    backgroundImage?: string,
    data: any;
}
const HeroSection: React.FC<Props> = ({ backgroundImage, data }) => {
    return (
        <>
            {/* <div style={{
                position: 'fixed', left: '0', top: '0', backgroundColor: '#1D1611', width: '100vw', height: '100vh', backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(29, 22, 17, 0.2) 0%, rgba(29, 22, 17, 1) 100%)',
                    pointerEvents: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '76px',
                }}>
                    < h1 style={{ letterSpacing: '88%' }} className='c-primary' > Villa Singer</h1>

                </div>
            </div > */}
            <Grid style={{ margin: '0 24px' }} container spacing={0}>
                <Grid item xs={8}>
                    <p>Designer freelance con 4+ anni di esperienza. Mi occupo di comunicazione visiva, grafica, branding, UI / UX design e sviluppo web.</p>
                </Grid>
            </Grid>

            <LenisWrapper orientation='horizontal' duration={3}>

                <div style={{ margin: '0 24px' }} className="scroll-container">

                    {data?.map((card: any, index: number) => {
                        return (
                            <Card data={card} key={index} />
                        )
                    })}
                </div>
            </LenisWrapper>


        </ >
    );
};

export default HeroSection;

