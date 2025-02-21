import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Bem-vindo ao Sistema de Estacionamento</h1>
            <nav>
                <ul>
                    <li><Link to="/vagas">Gerenciar Vagas</Link></li>
                    <li><Link to="/reservas">Gerenciar Reservas</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;

