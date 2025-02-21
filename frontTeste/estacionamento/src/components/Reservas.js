import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const Reserva = () => {
    const [reservas, setReservas] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [vagaSelecionada, setVagaSelecionada] = useState(null);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [dataInicio, setDataInicio] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        carregarReservas();
        carregarVagasDisponiveis();
        carregarClientes();
    }, []);

    const carregarReservas = async () => {
        try {
            const response = await fetch("http://localhost:9292/api/reservas");
            if (!response.ok) throw new Error("Erro ao carregar reservas");
            const data = await response.json();
            setReservas(data);
        } catch (error) {
            console.error("Erro ao carregar reservas:", error);
        }
    };

    const carregarVagasDisponiveis = async () => {
        try {
            const response = await fetch("http://localhost:9292/api/vagas/disponiveis");
            if (!response.ok) throw new Error("Erro ao carregar vagas disponíveis");
            const data = await response.json();
            setVagas(data);
        } catch (error) {
            console.error("Erro ao carregar vagas:", error);
        }
    };

    const carregarClientes = async () => {
        try {
            const response = await fetch("http://localhost:9292/api/clientes");
            if (!response.ok) throw new Error("Erro ao carregar clientes");
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error("Erro ao carregar clientes:", error);
        }
    };

    const criarReserva = async () => {
        if (!vagaSelecionada || !clienteSelecionado || !dataInicio) {
            toast.current.show({ severity: "warn", summary: "Erro", detail: "Preencha todos os campos!", life: 3000 });
            return;
        }

        try {
            const response = await fetch(`http://localhost:9292/api/reservas/${vagaSelecionada.id}/cliente/${clienteSelecionado.cpf}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataInicio }),
            });

            if (!response.ok) throw new Error("Erro ao criar reserva");

            toast.current.show({ severity: "success", summary: "Sucesso", detail: "Reserva criada!", life: 3000 });
            setDialogVisible(false);
            setVagaSelecionada(null);
            setClienteSelecionado(null);
            setDataInicio(null);
            carregarReservas();
        } catch (error) {
            console.error("Erro ao criar reserva:", error);
            toast.current.show({ severity: "error", summary: "Erro", detail: "Não foi possível criar a reserva.", life: 3000 });
        }
    };

    const encerrarReserva = async (id) => {
        try {
            const response = await fetch(`http://localhost:9292/api/reservas/${id}/encerrar`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Erro ao encerrar reserva");

            toast.current.show({ severity: "success", summary: "Sucesso", detail: "Reserva encerrada!", life: 3000 });
            carregarReservas();
        } catch (error) {
            console.error("Erro ao encerrar reserva:", error);
            toast.current.show({ severity: "error", summary: "Erro", detail: error.message, life: 3000 });
        }
    };

    const formatarData = (data) => {
        if (!data) return "";
        return new Date(data).toLocaleString("pt-BR", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hour12: false
        });
    };

    const formatarValor = (valor) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <h1>Gerenciamento de Reservas</h1>

            <Button label="Criar Reserva" icon="pi pi-plus" className="p-button-success mb-3" onClick={() => setDialogVisible(true)} />

            <DataTable value={reservas} paginator rows={5} emptyMessage="Nenhuma reserva encontrada." filterDisplay="row">
                <Column field="vaga.numero" header="Número da Vaga" sortable filter filterPlaceholder="Filtrar por número" />
                <Column field="cliente.nome" header="Cliente" sortable filter filterPlaceholder="Filtrar por Cliente" />
                <Column field="dataInicio" header="Data Início" body={(rowData) => formatarData(rowData.dataInicio)} sortable filter filterPlaceholder="Filtrar por Data Início" />
                <Column field="dataFim" header="Data Fim" body={(rowData) => formatarData(rowData.dataFim)} sortable filter filterPlaceholder="Filtrar por Data Fim" />
                <Column field="valorTotal" header="Valor Total" body={(rowData) => formatarValor(rowData.valorTotal)} sortable filter filterPlaceholder="Filtrar por Valor" />

                <Column
                    header="Ações"
                    body={(rowData) => (
                        <Button
                            label="Encerrar"
                            icon="pi pi-times"
                            className="p-button-danger"
                            onClick={() => encerrarReserva(rowData.id)}
                            disabled={rowData.vaga.status === "DISPONIVEL"}
                        />
                    )}
                />
            </DataTable>

            <Dialog visible={dialogVisible} onHide={() => setDialogVisible(false)} header="Criar Nova Reserva" modal>
                <div className="p-fluid">
                    <label htmlFor="cliente">Cliente</label>
                    <Dropdown
                        id="cliente"
                        value={clienteSelecionado}
                        options={clientes}
                        onChange={(e) => setClienteSelecionado(e.value)}
                        optionLabel="nome"
                        placeholder="Selecione um cliente"
                    />

                    <label htmlFor="vaga" className="mt-2">Vaga</label>
                    <Dropdown
                        id="vaga"
                        value={vagaSelecionada}
                        options={vagas}
                        onChange={(e) => setVagaSelecionada(e.value)}
                        optionLabel="numero"
                        placeholder="Selecione uma vaga"
                    />

                    <label htmlFor="dataInicio" className="mt-2">Data e Hora de Início</label>
                    <Calendar id="dataInicio" value={dataInicio} onChange={(e) => setDataInicio(e.value)} showTime hourFormat="24" />
                </div>

                <div className="p-d-flex p-jc-end mt-3">
                    <Button label="Reservar" icon="pi pi-check" className="p-button-success" onClick={criarReserva} />
                </div>
            </Dialog>
        </div>
    );
};

export default Reserva;

