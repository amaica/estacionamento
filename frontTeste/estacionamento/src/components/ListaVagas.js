import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown"; // 📌 Importação correta do Dropdown
import { Button } from "primereact/button";

const ListaVagas = () => {
    const [vagas, setVagas] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState(null); // 📌 Definição do estado para o filtro

    useEffect(() => {
        carregarVagas();
    }, []);

    const carregarVagas = async () => {
        try {
            const response = await fetch("http://localhost:9292/api/vagas");
            if (!response.ok) throw new Error("Erro ao carregar vagas");
            const data = await response.json();
            setVagas(data);
        } catch (error) {
            console.error("Erro ao carregar vagas:", error);
        }
    };

    return (
        <DataTable value={vagas} paginator rows={5} responsiveLayout="scroll" filterDisplay="row">
            {/* Número da Vaga com Filtro */}
            <Column field="numero" header="Número" sortable filter filterPlaceholder="Filtrar por número" />

            {/* Tipo de Vaga com Filtro */}
            <Column field="tipo" header="Tipo" sortable filter filterPlaceholder="Filtrar por tipo" />

            {/* Valor por Hora Formatado com Filtro Numérico */}
            <Column
                field="valorPorHora"
                header="Valor por Hora"
                body={(row) => `R$ ${row.valorPorHora.toFixed(2)}`}
                sortable
                filter
                filterPlaceholder="Filtrar por valor"
            />

            {/* Status com Filtro de Dropdown */}
            <Column
                field="status"
                header="Status"
                sortable
                filter
                filterElement={() => (
                    <Dropdown
                        options={[
                            { label: "Todos", value: null },
                            { label: "Disponível", value: "DISPONIVEL" },
                            { label: "Reservada", value: "RESERVADA" },
                            { label: "Ocupada", value: "OCUPADA" }
                        ]}
                        placeholder="Filtrar por Status"
                        onChange={(e) => setFiltroStatus(e.value)}
                        value={filtroStatus}
                    />
                )}
            />
        </DataTable>
    );
};

export default ListaVagas;

