import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button type="submit" className={`bttn mt-8 ${props.backgroundColorClass}`}>{props.text}</button>
    );
};

//Para usar el botón en un componente adaptar la siguiente línea:
//<Button backgroundColorClass="bttn-primary" text="¿Te apuntas?" />

export default Button;