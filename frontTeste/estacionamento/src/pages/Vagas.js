import React from "react";
import ListaVagas from "../components/ListaVagas";
import CadastroVaga from "../components/CadastroVaga";

const Vagas = () => {
    return (
        <div>
            <h1>Gerenciar Vagas</h1>
            <ListaVagas />
            <CadastroVaga />
        </div>
    );
};

export default Vagas;

