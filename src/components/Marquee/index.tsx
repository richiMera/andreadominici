import React, { useRef, useEffect } from "react";
import {
    motion,
    useSpring,
    useTransform,
    PanInfo,
    MotionValue,
} from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useRafLoop } from "react-use";
import { useWindowSize } from "@react-hook/window-size";

type MarqueeItemProps = {
    children: React.ReactNode;
    speed: MotionValue<any>;
    direction: string;
};

const MarqueeItem: React.FC<MarqueeItemProps> = (props) => {


    const { children, speed, direction } = props;
    console.log('speed', speed);

    const itemRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const x = useRef(0);
    const [width, height] = useWindowSize();

    const setX = () => {
        if (!itemRef.current || !rectRef.current) {
            return;
        }

        const xPercentage = (x.current / rectRef.current.width) * 100;

        if (xPercentage < -100) {
            x.current = 0;
        }

        if (xPercentage > 0) {
            x.current = -rectRef.current.width;
        }

        itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
    };

    useEffect(() => {
        if (itemRef.current) {
            rectRef.current = itemRef.current.getBoundingClientRect();
        }
    }, [width, height]);

    const loop = () => {
        // Modifica il valore di x.current in base alla direzione
        if (direction === 'left') {
            x.current -= speed.get();
        } else {
            x.current += speed.get();
        }
        setX();
    };

    const [_, loopStart] = useRafLoop(loop, false);

    useEffect(() => {
        loopStart();
    }, []);

    return (
        <motion.div className="item" ref={itemRef}>
            {children}
        </motion.div>
    );
};

type MarqueeProps = {
    speed?: number;
    threshold?: number;
    wheelFactor?: number;
    children: React.ReactNode;
    direction?: "left" | "right";
};

export const InteractiveMarquee: React.FC<MarqueeProps> = (props) => {
    const {
        speed = 3,
        threshold = 0.014,
        wheelFactor = 1.8,
        children,
        direction = 'left'
    } = props;

    const marqueeRef = useRef<HTMLDivElement>(null);
    const slowDown = useRef(false);
    const isScrolling = useRef<any>(null);
    const constraintsRef = useRef<HTMLDivElement>(null);

    const x = useRef(0);
    const [wWidth] = useWindowSize();
    const speedSpring = useSpring(speed, {
        damping: 40,
        stiffness: 90,
        mass: 5
    });

    const opacity = useTransform(
        speedSpring,
        [-wWidth * 0.05, 0, wWidth * 0.05],
        [1, 0, 1]
    );
    const skewX = useTransform(
        speedSpring,
        [-wWidth * 0.05, 0, wWidth * 0.05],
        direction === 'left' ? [1, 0, 1] : [-1, 0, -1]
    );

    const handleOnWheel = (e: React.WheelEvent<HTMLDivElement> | undefined) => {
        const normalized = normalizeWheel(e);

        // Questo utilizza la rotella per accelerare la timeline
        x.current = normalized.pixelY * wheelFactor;

        // Ripristina la velocità alla fine dello scroll
        if (isScrolling.current) {
            window.clearTimeout(isScrolling.current);
        }

        isScrolling.current = setTimeout(() => {
            speedSpring.set(speed);
        }, 30);
    };

    const loop = () => {
        if (slowDown.current || Math.abs(x.current) < threshold) {
            return;
        }

        x.current *= 0.66;

        speedSpring.set(speed + (direction === 'left' ? -x.current : x.current));
    };

    useRafLoop(loop);

    return (
        <>
            <motion.div className="bg" style={{ opacity }} ref={constraintsRef} />
            <motion.div
                className="marquee"
                ref={marqueeRef}
                style={{ skewX }}
                onWheel={handleOnWheel}
            >
                <MarqueeItem direction={direction} speed={speedSpring}>{children}</MarqueeItem>
                <MarqueeItem direction={direction} speed={speedSpring}>{children}</MarqueeItem>
            </motion.div>
        </>
    );
};
