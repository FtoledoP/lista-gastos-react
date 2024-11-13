import { Helmet } from "react-helmet"
import {Header, Titulo, ContenedorHeader} from "../elements/Header"
import Boton from "../elements/Boton"
import { Formulario, Input, ContenedorBoton } from "../elements/ElementosDeFormulario"
import SvgLogin from './../imagenes/login.svg';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Alerta from '../elements/Alerta';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem;
    margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
    const navigate = useNavigate();
	const [correo, establecerCorreo] = useState('');
	const [password, establecerPassword] = useState('');
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	const handleChange = (e) => {
		if(e.target.name === 'email'){
			establecerCorreo(e.target.value);
		} else if (e.target.name === 'password'){
			establecerPassword(e.target.value);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		cambiarEstadoAlerta(false);
		cambiarAlerta({});

		const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
		if( !expresionRegular.test(correo) ){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por ingresa un correo electrónico valido'
			});
			return;
		}

		if(correo === '' || password === ''){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por favor rellena todos los datos'
			});
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, correo, password);
			navigate('/');
		} catch(error) {
			console.log(error)
			cambiarEstadoAlerta(true);
			let mensaje;
			switch(error.code){
				case 'auth/invalid-credential':
					mensaje = 'El correo o contraseña no son correctos.'
					break;
				case 'auth/user-not-found':
					mensaje = 'No se encontro ninguna cuenta con este correo electrónico.'
					break;
				default:
					mensaje = 'Hubo un error al intentar iniciar sesion.'
				break;
			}

			cambiarAlerta({tipo: 'error', mensaje: mensaje});
		}
	}
    return (
		<>
			<Helmet>
				<title>Iniciar Sesión</title>
			</Helmet>

			<Header>
				<ContenedorHeader>
					<Titulo>Iniciar Sesión</Titulo>
					<div>
						<Boton to="/crear-cuenta">Registrarse</Boton>
					</div>
				</ContenedorHeader>
			</Header>

			<Formulario onSubmit={handleSubmit}>
				<Svg />
				<Input 
					type="email"
					name="email"
					placeholder="Correo Electrónico"
					value={correo}
					onChange={handleChange}
				/>
				<Input 
					type="password"
					name="password"
					placeholder="Contraseña"
					value={password}
					onChange={handleChange}
				/>
				<ContenedorBoton>
					<Boton as="button" primario type="submit">Iniciar Sesión</Boton>
				</ContenedorBoton>
			</Formulario>

			<Alerta 
				tipo={alerta.tipo}
				mensaje={alerta.mensaje}
				estadoAlerta={estadoAlerta}
				cambiarEstadoAlerta={cambiarEstadoAlerta}
			/>
		</>
	);
}

export default InicioSesion