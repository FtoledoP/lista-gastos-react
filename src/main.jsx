import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditarGasto from './components/EditarGasto.jsx';
import GastosPorCategoria from './components/GastosPorCategoria.jsx';
import InicioSesion from './components/InicioSesion.jsx';
import RegistroUsuarios from './components/RegistroUsuarios.jsx';
import ListaDeGastos from './components/ListaDeGastos.jsx';
import Fondo from './elements/Fondo.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import RutaPrivada from './components/RutaPrivada.jsx';
import { TotalGastadoProvider } from './contexts/TotalGastadoEnElMesContext.jsx';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans_serif']
  }
});


const Index = () => {
  return (
    <>
      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Routes>
                <Route path="/iniciar-sesion" element={<InicioSesion />} />
                <Route path="/crear-cuenta" element={<RegistroUsuarios />} />

                <Route path="/categorias" element={
                  <RutaPrivada>
                    <GastosPorCategoria />
                  </RutaPrivada>
                } />

                <Route path="/lista" element={
                  <RutaPrivada>
                    <ListaDeGastos />
                  </RutaPrivada>
                } />

                <Route path="/editar/:id" element={
                  <RutaPrivada>
                    <EditarGasto />
                  </RutaPrivada>
                } />

                <Route path="/" element={
                  <RutaPrivada>
                    <App />
                  </RutaPrivada>
                } />
              </Routes>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>
      <Fondo />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
  </StrictMode>,
)
