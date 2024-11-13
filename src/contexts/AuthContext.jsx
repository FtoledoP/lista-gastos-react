import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {auth} from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();
    const [cargando, cambiarCargando] = useState(true);

    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });
        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            { !cargando && children }
        </AuthContext.Provider>
    );
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {AuthProvider, AuthContext, useAuth};