import IconoComida from './../imagenes/cat_comida.svg';
import IconoCompras from './../imagenes/cat_compras.svg';
import IconoCuentasYPagos from './../imagenes/cat_cuentas-y-pagos.svg';
import IconoDiversion from './../imagenes/cat_diversion.svg';
import IconoHogar from './../imagenes/cat_hogar.svg';
import IconoRopa from './../imagenes/cat_ropa.svg';
import IconoSaludEHigiene from './../imagenes/cat_salud-e-higiene.svg';
import IconoTransporte from './../imagenes/cat_transporte.svg';
import PropTypes from 'prop-types';

const IconoCategoria = ({id}) => {
	switch(id){
		case 'comida':
			return <IconoComida />;
		case 'compras':
			return <IconoCompras />;
		case 'cuentas y pagos':
			return <IconoCuentasYPagos />;
		case 'diversion':
			return <IconoDiversion />;
		case 'hogar':
			return <IconoHogar />;
		case 'ropa':
			return <IconoRopa />;
		case 'salud e higiene':
			return <IconoSaludEHigiene />;
		case 'transporte':
			return <IconoTransporte />;
		default:
		break;
	}
}
IconoCategoria.propTypes = {
	id: PropTypes.string.isRequired
};

export default IconoCategoria;