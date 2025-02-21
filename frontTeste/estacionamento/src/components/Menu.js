import { Link } from "react-router-dom";

const Menu = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cadastro">Cadastro de Vagas</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/vagas">Lista de Vagas</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
        </ul>
    </nav>
);

export default Menu;

