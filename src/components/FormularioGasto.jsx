import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from "../elements/ElementosDeFormulario";
import Boton from "../elements/Boton";
import IconoPlus from './../imagenes/plus.svg';
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import { fromUnixTime, getUnixTime } from "date-fns";
import agregarGasto from './../firebase/agregarGasto';
import {useAuth} from './../contexts/AuthContext';
import Alerta from "../elements/Alerta";
import {useNavigate} from 'react-router-dom';
import editarGasto from './../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {

    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const {usuario} = useAuth();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
		if(gasto){
			if(gasto.data().uidUsuario === usuario.uid){
				cambiarCategoria(gasto.data().categoria);
				cambiarFecha(fromUnixTime(gasto.data().fecha));
				cambiarInputDescripcion(gasto.data().descripcion);
				cambiarInputCantidad(gasto.data().cantidad);
			} else {
				navigate('/lista');
			}
		}
	}, [gasto, usuario, navigate]);

    const handleChange = (e) => {
        if(e.target.name === 'descripcion'){
            cambiarInputDescripcion(e.target.value);
        } else if(e.target.name === 'cantidad'){
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let cantidad = parseFloat(inputCantidad).toFixed(2);

        if (inputDescripcion !== '' && inputCantidad !== '') {
            if (cantidad) {
                if(gasto){
                    try {
                        await editarGasto({
                            id: gasto.id,
                            categoria: categoria,
                            descripcion: inputDescripcion,
                            cantidad: cantidad,
                            fecha: getUnixTime(fecha)});
                        navigate('/lista');
                    } catch (error) {
                        console.log(error);
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({ tipo: 'error', mensaje: 'Hubo un problema al intentar editar el gasto.' })    
                    }
                }else{
                    try {
                        await agregarGasto({
                            categoria: categoria,
                            descripcion: inputDescripcion,
                            cantidad: cantidad,
                            fecha: getUnixTime(fecha),
                            uidUsuario: usuario.uid
                        });
                        cambiarCategoria('hogar');
                        cambiarInputDescripcion('');
                        cambiarInputCantidad('');
                        cambiarFecha(new Date());
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({ tipo: 'exito', mensaje: 'El gasto fue agregado correctamente.' });
                    } catch (error) {
                        console.log(error);
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({ tipo: 'error', mensaje: 'Hubo un problema al intentar agregar el gasto.' })    
                    }
                }
            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({ tipo: 'error', mensaje: 'El valor que ingresaste es incorrecto.' })
            }
        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'Por favor rellena todos los campos.' })
        }
    }
     
    return (
        <Formulario onSubmit={handleSubmit}>
			<ContenedorFiltros>
				<SelectCategorias
					categoria={categoria}
					cambiarCategoria={cambiarCategoria}
				/>
				<DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
			</ContenedorFiltros>

			<div>
				<Input 
					type="text"
					name="descripcion"
					placeholder="Descripción"
					value={inputDescripcion}
					onChange={handleChange}
				/>
				<InputGrande 
					type="text"
					name="cantidad"
					placeholder="$0.00"
					value={inputCantidad}
					onChange={handleChange}
				/>
			</div>
			<ContenedorBoton>
				<Boton as="button" primario conIcono type="submit">
					{gasto ? 'Editar Gasto' : 'Agregar Gasto'}  <IconoPlus />
				</Boton>
			</ContenedorBoton>
			<Alerta 
				tipo={alerta.tipo}
				mensaje={alerta.mensaje}
				estadoAlerta={estadoAlerta}
				cambiarEstadoAlerta={cambiarEstadoAlerta}
			/>
		</Formulario>
    );
}
FormularioGasto.propTypes = {
    gasto: PropTypes.object
};

export default FormularioGasto;