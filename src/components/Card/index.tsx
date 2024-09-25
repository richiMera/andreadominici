import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScroll, useTransform, motion } from 'framer-motion';
import './style.css'


interface Props {
    index: number,
    progress?: any,
    range?: any,
    targetScale?: any,
    data?: any
}

const Card: React.FC<Props> = ({ index, progress, range, targetScale, data }) => {
    const navigate = useNavigate();
    const container = useRef<HTMLDivElement | null>(null);

    console.log(index, progress, range, targetScale, data);


    const scale = useTransform(progress, range, [1, targetScale]);
    return (

        <div ref={container} className='cardsContainer'>
            <motion.div style={{ scale, top: `calc(-10% + ${index * 25}px)` }} className='card'>

            </motion.div>
        </div>
        //  <div style={{ width: 'calc(100vw - 48px)', backgroundColor: 'green', height: '100vh' }}>

        //  </div>
    );
};



export default Card;
