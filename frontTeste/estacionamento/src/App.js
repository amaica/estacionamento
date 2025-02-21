import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import CadastroVaga from "./components/CadastroVaga";
import Clientes from "./components/Clientes";
import ListaVagas from "./components/ListaVagas";
import Reserva from "./components/Reservas";

function App() {
    return (
        <Router>
            <div className="container">
                <Menu />
                <Routes>
                    <Route path="/" element={<h1>Bem-vindo ao Sistema de Estacionamento</h1>} />
                    <Route path="/cadastro" element={<CadastroVaga />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/vagas" element={<ListaVagas />} />
                    <Route path="/reservas" element={<Reserva />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

