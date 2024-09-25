import React, { useEffect, useRef } from 'react';
import './style.css'; // Importa il CSS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';
import heroImage1 from '../../assets/1.jpg'
import heroImage2 from '../../assets/2.jpg'
import heroImage3 from '../../assets/3.jpg'
import heroImage4 from '../../assets/4.jpg'
import heroImage5 from '../../assets/5.jpg'
import { Grid } from '@mui/material';
import { InteractiveMarquee } from '../Marquee';
import Footer from '../Footer';

gsap.registerPlugin(ScrollTrigger);

interface GsapTryProps {
    data?: any;
}

const GsapTry: React.FC<GsapTryProps> = ({ data }) => {
    const sectionPinRef = useRef<HTMLDivElement | null>(null);
    const imageWrapperRefs = useRef<Array<HTMLDivElement | null>>([]);
    const firstBoxRef = useRef<HTMLDivElement | null>(null);
    const servicesBoxRef = useRef<HTMLDivElement | null>(null);

    const dataFaq = [{
        domanda: '1. Quanto costa un logo? E un sito?',
        risposta: 'La risposta più corretta è dipende. Ogni progetto ha le sue dimensioni e non esiste uno standard valido per tutti. Se ti serve un preventivo non esitare a contattarmi!'
    }, {
        domanda: '2. Sto avviando un’attività e non ho un grosso budget. Puoi aiutarmi?',
        risposta: 'Sì, certo. Sarò lieto di collaborare con la tua nuova realtà e di contribuire alla sua definizione. Qui trovi una lista di tutti i servizi che offro.'
    }, {
        domanda: '3. Come avviene il processo?',
        risposta: 'Sì, certo. Sarò lieto di collaborare con la tua nuova realtà e di contribuire alla sua definizione. Qui trovi una lista di tutti i servizi che offro.'
    }, {
        domanda: '4. Perché dovrei aver bisogno di un designer?',
        risposta: 'Sì, certo. Sarò lieto di collaborare con la tua nuova realtà e di contribuire alla sua definizione. Qui trovi una lista di tutti i servizi che offro.'
    }, {
        domanda: '5. Si dice Dominìci o Domìnici?',
        risposta: 'Sì, certo. Sarò lieto di collaborare con la tua nuova realtà e di contribuire alla sua definizione. Qui trovi una lista di tutti i servizi che offro.'
    },]

    useEffect(() => {
        if (sectionPinRef.current) {
            const sectionPin = sectionPinRef.current;

            // Imposta la larghezza dinamica di sectionPin in base al numero di elementi
            const imageWrapperCount = imageWrapperRefs.current.length;
            sectionPin.style.width = `${imageWrapperCount * 100}vw`;

            // Inizializza l'animazione GSAP con ScrollTrigger
            const containerAnimation = gsap.to(sectionPin, {
                scrollTrigger: {
                    trigger: '#section_to-pin',
                    start: 'top top',
                    end: () => "+=" + (sectionPin.scrollWidth - window.innerWidth),
                    pin: true,
                    scrub: true,
                },
                x: () => -(sectionPin.scrollWidth - window.innerWidth) + "px",
                ease: 'none',
            });

            // Imposta l'animazione per il padding di image_wrapper_1
            if (firstBoxRef.current) {
                gsap.to(imageWrapperRefs.current[0], {
                    padding: '0px 0px', // Valore finale del padding
                    scrollTrigger: {
                        trigger: firstBoxRef.current,
                        start: 'top top', // Inizio dell'animazione
                        end: 'top+=100 top', // Fine dell'animazione
                        scrub: true, // Anima gradualmente durante lo scroll
                        onUpdate: (self) => {
                            console.log('verifica', self.progress);
                            const progress = self.progress; // Valore di progresso tra 0 e 1
                            gsap.set(imageWrapperRefs.current[0], {
                                padding: `0px ${(1 - progress) * 24}px ` // Riduce il padding da 24 a 0
                            });
                        }
                    }
                });
            }

            // Imposta l'animazione per il padding di image_wrapper_5
            if (servicesBoxRef.current) {
                gsap.to(imageWrapperRefs.current[4], {
                    padding: '0px 24px', // Valore finale del padding
                    scrollTrigger: {
                        trigger: servicesBoxRef.current,
                        start: 'top bottom', // Inizio dell'animazione
                        end: 'top+=100 top', // Fine dell'animazione
                        scrub: true, // Anima gradualmente durante lo scroll
                        onUpdate: (self) => {
                            console.log('verifica', self.progress);

                            const progress = self.progress; // Valore di progresso tra 0 e 1
                            gsap.set(imageWrapperRefs.current[4], {
                                padding: `0px ${progress * 24}px ` // Aumenta il padding da 0 a 24
                            });
                        }
                    }
                });
            }

            // Itera su ciascun elemento image_wrapper e applica ScrollTrigger
            imageWrapperRefs.current.forEach((imageWrapper, index) => {
                if (imageWrapper) {
                    const imageWrapperID = `image_wrapper_${index + 1}`;

                    gsap.to(imageWrapper, {
                        scrollTrigger: {
                            trigger: imageWrapper,
                            start: 'left center',
                            end: 'right center',
                            containerAnimation: containerAnimation,
                            toggleClass: {
                                targets: `.${imageWrapperID}`,
                                className: 'active',
                            },
                        }
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.2,
        });

        lenis.on('scroll', ScrollTrigger.update);

        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);

        return () => {
            gsap.ticker.remove(updateLenis);
        };
    }, []);

    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 24px 0 24px' }} className=''>
                <h1>andrea dominici</h1>
                <nav>
                    <ul>
                        <li className='link'><Link to="/" aria-label="I nostri progetti">Progetti</Link></li>
                        <li className='link'><Link to="/about" aria-label="Informazioni su di noi">Chi sono</Link></li>
                        <li className='link'><Link to="/services" aria-label="I nostri servizi">Servizi</Link></li>
                        <li className='link'><Link to="/contact" aria-label="Il nostro archivio">Archivio</Link></li>
                        <li className='link'><Link to="/contact" aria-label="Contattaci">Contatti</Link></li>
                    </ul>
                </nav>
            </header>
            <section ref={firstBoxRef} style={{ padding: '192px 24px 0 24px' }} className="mb-24">
                <div style={{ width: '66%', }} className="grid-container">
                    <p className='p-extra-large'>Mi chiamo Andrea e sono un designer freelance.
                        Sono specializzato in comunicazione visiva, branding, UI / UX design e sviluppo web.</p>
                </div>
            </section>

            <section id="section_to-pin" className="grid-container full section section_to-pin four mb-24">
                <div id="section_pin" className="section_pin" ref={sectionPinRef}>
                    <div id="image_wrapper_1"
                        className="image_wrapper image_wrapper_1"
                        ref={(el) => (imageWrapperRefs.current[0] = el)}
                        style={{ backgroundColor: 'transparent', height: '100vh', width: '100vw', padding: '0 24px' }}>
                        <div style={{
                            height: '100%', width: '100%', backgroundImage: `url(${heroImage1})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center'
                        }} />
                    </div>
                    <div style={{
                        backgroundColor: 'yellow', height: '100vh', width: '100vw', backgroundImage: `url(${heroImage2})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center'
                    }}
                        id="image_wrapper_2"
                        className="image_wrapper image_wrapper_2"
                        ref={(el) => (imageWrapperRefs.current[1] = el)}
                    />
                    <div style={{
                        backgroundColor: 'green', height: '100vh', width: '100vw', backgroundImage: `url(${heroImage3})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center'
                    }}
                        id="image_wrapper_3"
                        className="image_wrapper image_wrapper_3"
                        ref={(el) => (imageWrapperRefs.current[2] = el)}
                    />
                    <div style={{
                        backgroundColor: 'purple', height: '100vh', width: '100vw', backgroundImage: `url(${heroImage4})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center'
                    }}
                        id="image_wrapper_4"
                        className="image_wrapper image_wrapper_4"
                        ref={(el) => (imageWrapperRefs.current[3] = el)}
                    />

                    <div id="image_wrapper_5"
                        className="image_wrapper image_wrapper_5"
                        ref={(el) => (imageWrapperRefs.current[4] = el)}
                        style={{ backgroundColor: 'transparent', height: '100vh', width: '100vw', padding: '0 0' }}>
                        <div style={{
                            backgroundColor: 'black', height: '100%', width: '100%', backgroundImage: `url(${heroImage5})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center'

                        }} />
                    </div>

                </div>
            </section>

            <section style={{ padding: '0 24px' }} className="mb-256 ">
                <Grid container style={{ borderTop: '1px solid black', paddingTop: '8px' }} ref={servicesBoxRef} className="">
                    <Grid item xs={6}>
                        <h4>Servizi</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <p className='p-large mb-24'>Durante la mia carriera, ho avuto la fortuna di lavorare in vari ambiti del design, dalla grafica editoriale al design digitale, dal logo design alla progettazione di interfacce web.</p>
                        <Link className='link' to="/services" aria-label="Scopri i nostri servizi">Scopri di più</Link>
                    </Grid>
                </Grid>

            </section>
            <section className="mb-256 ">

                <InteractiveMarquee direction='left'>
                    <h2 className='marquee-item'>Comunicazione visiva</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item' >Logo Design</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Branding</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Immagine coordinata</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>

                </InteractiveMarquee>
                <InteractiveMarquee direction='right' speed={1}>
                    <h2 className='marquee-item'>Design editoriale</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item' >Progettazione grafica</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Locandine</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Libri</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Riviste</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Brochure</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                </InteractiveMarquee>
                <InteractiveMarquee direction='left'>
                    <h2 className='marquee-item'>UX Design</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item' >Web Design</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Wireframing</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>UI Design</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>
                    <h2 className='marquee-item'>Sviluppo Web</h2>
                    <h2 style={{ color: '#E71C00', display: 'flex', alignItems: 'center', fontSize: '35px' }} className='marquee-item'>&#x2022;</h2>

                </InteractiveMarquee>

            </section>
            <section style={{ padding: '0 24px' }} className="mb-112 ">
                <Grid container style={{ borderTop: '1px solid black', paddingTop: '8px' }} className="mb-128">
                    <Grid item xs={6}>
                        <h4 >Domande</h4>
                    </Grid>
                    <Grid style={{ paddingLeft: '24px' }} item xs={6}>
                        <h4 >Risposte</h4>

                    </Grid>
                </Grid>

                {dataFaq.map((faq: any, index: number) => {
                    return (
                        <Grid key={index} container style={{ borderBottom: '1px solid black', padding: '16px 0 48px 0' }} className="">
                            <Grid item xs={6}>
                                <h3 >{faq.domanda}</h3>
                            </Grid>
                            <Grid style={{ paddingLeft: '24px' }} item xs={6}>
                                <p className='p-regular' >{faq.risposta}</p>

                            </Grid>
                        </Grid>
                    )
                })}


            </section >
            <Footer />
        </>
    );
};

export default GsapTry;
