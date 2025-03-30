import { useState, useLayoutEffect } from 'react';
import styles from './RippleEffect.module.css';

interface RippleProps {
    children: React.ReactNode;
    className?: string;
}

export const RippleEffect = ({ children, className = '' }: RippleProps) => {
    const [rippleArray, setRippleArray] = useState<Array<{
        x: number;
        y: number;
        size: number;
    }>>([]);

    useLayoutEffect(() => {
        const rippleTimeout = setTimeout(() => {
            setRippleArray([]);
        }, 600); // Match animation duration

        return () => clearTimeout(rippleTimeout);
    }, [rippleArray]);

    const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height;
        const x = event.pageX - rippleContainer.x - size / 2;
        const y = event.pageY - rippleContainer.y - size / 2;
        
        setRippleArray([...rippleArray, { x, y, size }]);
    };

    return (
        <div
            className={`${styles.rippleContainer} ${className}`}
            onMouseDown={addRipple}
        >
            {rippleArray.length > 0 &&
                rippleArray.map((ripple, index) => {
                    return (
                        <span
                            key={index}
                            className={styles.ripple}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size,
                            }}
                        />
                    );
                })}
            {children}
        </div>
    );
};