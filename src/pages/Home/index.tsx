import React, { useRef } from 'react';

import { useMediaQuery } from '@react-hook/media-query';

import casaImg from '../../assets/casa-img.png'
import giardinoImg from '../../assets/giardino-img.png'
import './style.css'
import LenisWrapper from '../../components/LenisWrapper';
import { useScroll, motion } from 'framer-motion';
import Card from '../../components/Card';
import { InteractiveMarquee } from '../../components/Marquee';
import HeroSection from '../../components/HeroSection';





const cardsData = [
    {
        title: 'La casa',
        chapter: 'Capitolo 1',
        content: 'loremIpsum',
        imageUrl: casaImg,
        routeName: 'lacasa'
    },
    {
        title: 'Il giardino',
        chapter: 'Capitolo 2',
        content: 'loremIpsum',
        imageUrl: giardinoImg,
        routeName: 'ilgiardino'
    },
    {
        title: 'Ospitalità',
        chapter: 'Capitolo 3',
        content: 'loremIpsum',
        imageUrl: casaImg,
        routeName: 'ospitalita'
    },
    {
        title: 'Storie',
        chapter: 'Capitolo 4',
        content: 'loremIpsum',
        imageUrl: giardinoImg,
        routeName: 'storie'
    },
    {
        title: 'Il giardino',
        chapter: 'Capitolo 2',
        content: 'loremIpsum',
        imageUrl: casaImg,
        routeName: 'lacasa'
    },


]


const Home: React.FC = () => {


    const mainContainer = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress: scrollYMainProgress } = useScroll({
        target: mainContainer,
        offset: ['start start', 'end end'],
    });

    const items = ["AI", "Design", "Web Development", "AI", "Design", "Web Development"]; // Duplico gli elementi per dare l'illusione del loop infinito.

    const duplicatedItems = [...items, ...items];
    // const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);

    const isMobile = useMediaQuery('(max-width: 768px)');


    return (
        <div style={{ overflow: 'hidden' }}>
            {/* <HeroSection data={cardsData} />
            <div style={{ height: '100vh', backgroundColor: 'black' }}></div> */}
            <div style={{ height: '100vh', backgroundColor: 'black' }}></div>
            <LenisWrapper orientation='vertical' duration={3}>

                <div style={{ display: 'flex', width: 'max-content', }} ref={mainContainer}>
                    {cardsData.map((card: any, index: number) => {
                        const targetScale = 1 - ((cardsData.length - index) * 0.05)
                        return (
                            <Card key={index} index={index} progress={scrollYMainProgress} range={[1 * 0.25, 1]} targetScale={targetScale} />
                        )
                    })}
                </div>

                {/* <div style={{ height: '100vh', backgroundColor: 'green' }}>
                    <InteractiveMarquee direction='left'>
                        <div className='marquee-item'>Comunicazione visiva</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item' >Logo Design</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Branding</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Immagine coordinata</div>
                        <div className='marquee-item'>&#x2022;</div>

                    </InteractiveMarquee>
                    <InteractiveMarquee direction='right' speed={1}>
                        <div className='marquee-item'>Design editoriale</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item' >Progettazione grafica</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Locandine</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Libri</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Riviste</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Brochure</div>
                        <div className='marquee-item'>&#x2022;</div>
                    </InteractiveMarquee>
                    <InteractiveMarquee direction='left'>
                        <div className='marquee-item'>UX Design</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item' >Web Design</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Wireframing</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>UI Design</div>
                        <div className='marquee-item'>&#x2022;</div>
                        <div className='marquee-item'>Sviluppo Web</div>
                        <div className='marquee-item'>&#x2022;</div>

                    </InteractiveMarquee>

                </div> */}

                <div style={{ height: '100vh', backgroundColor: 'black' }}></div>

            </LenisWrapper>
        </div>
    );


};

export default Home;










