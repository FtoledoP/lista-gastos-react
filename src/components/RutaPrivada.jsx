import {useAuth} from './../contexts/AuthContext';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const RutaProtegida = ({children}) => {
	const {usuario} = useAuth();

	if(usuario){
		return children;
	} else {
		return <Navigate replace to="/iniciar-sesion" />;
	}
}
RutaProtegida.propTypes = {
	children: PropTypes.node.isRequired
};

export default RutaProtegida;