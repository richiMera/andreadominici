import React from 'react';

// Tipizzazione dell'interfaccia Props
interface Props {
    type: 'main' | 'back' | 'open';  // Solo 'main' o 'back' sono accettabili
    text: string;
    onClick: React.MouseEventHandler<HTMLDivElement | HTMLParagraphElement>; // onClick opzionale
}

// Componente Button
const Button: React.FC<Props> = ({ type, text, onClick }) => {
    // Rendering condizionale basato su 'type'
    if (type === 'main') {
        return (
            <div
                className='pointer'
                style={{ padding: '16px 24px', border: '1px solid white' }}
                onClick={onClick} // Gestione dell'evento onClick
            >
                <p className='c-primary' style={{ fontSize: '20px' }}>{text}</p>
            </div>
        );
    }
    if (type === 'back') {
        return (
            <p
                style={{ fontSize: '16px' }}
                className='c-primary pointer'
                onClick={onClick} // Gestione dell'evento onClick
            >
                {text}
            </p>
        );
    }



    // Caso di default se 'type' non è 'main' o 'back'
    return null;
};

export default Button;
