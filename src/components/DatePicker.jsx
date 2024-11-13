import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import PropTypes from 'prop-types';
import { es } from "date-fns/locale";
import styled from "styled-components";
import theme from './../theme';
import { useState } from "react";

const ContenedorInput = styled.div`
    position: relative; /* Necesario para que los elementos absolutos se posicionen respecto a este contenedor */

    input {
        font-family: 'Work Sans', sans-serif;       
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .rpd { 
        position: absolute; /* Flotante sobre el input */
        top: 100%; /* Justo debajo del input */
        left: 0;
        z-index: 100; /* Para que aparezca encima de otros elementos */
    }

    .rpd-months {
        display: flex;
        justify-content: center;
    }

    .rpd-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
        border-radius: 10px;
    }
`;


const formatFecha = (fecha = new Date()) => {
    return format(fecha, `dd 'de' MMMM 'de' yyyy`, {locale:es})
}

const DatePicker = ({fecha, cambiarFecha}) => {
    const [visible, cambiarVisible] = useState(false);

	return (
		<ContenedorInput>
            <input type="text" readOnly value={formatFecha(fecha)} onClick={() => cambiarVisible(!visible)}/>
            { visible && <DayPicker mode="single" selected={fecha} onSelect={cambiarFecha} locale={es}/>}
        </ContenedorInput>
	);
}
DatePicker.propTypes = {
    fecha: PropTypes.instanceOf(Date).isRequired,
    cambiarFecha: PropTypes.func.isRequired
};

export default DatePicker;