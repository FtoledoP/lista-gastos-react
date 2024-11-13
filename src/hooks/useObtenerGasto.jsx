import {useEffect, useState} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useNavigate} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';

const useObtenerGasto = (id) => {
	const navigate = useNavigate();
	const [gasto, establecerGasto] = useState('');
	
	useEffect(() => {
		const obtenerGasto = async() => {
			const documento = await getDoc(doc(db, 'gastos', id));

            //Por alguna razon el .exists no funciona, por lo que se usa el data y el undefined

			if((documento.data() != undefined)){
				establecerGasto(documento);
			} else {	
				navigate('/lista');
			}
		}

		obtenerGasto();
	}, [navigate, id]);

	return [gasto];
}
 
export default useObtenerGasto;