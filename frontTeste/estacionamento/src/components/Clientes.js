import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        carregarClientes();
    }, []);

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

    const excluirCliente = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

        try {
            const response = await fetch(`http://localhost:9292/api/clientes/${id}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Erro ao excluir cliente");

            toast.current.show({ severity: "success", summary: "Sucesso", detail: "Cliente excluído!", life: 3000 });
            carregarClientes();
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            toast.current.show({ severity: "error", summary: "Erro", detail: "Não foi possível excluir.", life: 3000 });
        }
    };

    const abrirModalCadastro = () => {
        setClienteSelecionado({ nome: "", cpf: "" });
        setDialogVisible(true);
    };

    const editarCliente = (cliente) => {
        setClienteSelecionado(cliente);
        setDialogVisible(true);
    };

    const salvarCliente = async () => {
        if (!clienteSelecionado.nome || !clienteSelecionado.cpf) {
            toast.current.show({ severity: "warn", summary: "Erro", detail: "Preencha todos os campos!", life: 3000 });
            return;
        }

        const metodo = clienteSelecionado.id ? "PUT" : "POST";
        const url = clienteSelecionado.id
            ? `http://localhost:9292/api/clientes/${clienteSelecionado.id}`
            : "http://localhost:9292/api/clientes";

        try {
            const response = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteSelecionado),
            });

            if (!response.ok) throw new Error("Erro ao salvar cliente");

            toast.current.show({
                severity: "success",
                summary: "Sucesso",
                detail: clienteSelecionado.id ? "Cliente atualizado!" : "Cliente cadastrado!",
                life: 3000
            });

            setDialogVisible(false);
            carregarClientes();
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            toast.current.show({ severity: "error", summary: "Erro", detail: "Não foi possível salvar o cliente.", life: 3000 });
        }
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <h1>Lista de Clientes</h1>

            {/* 🔥 Botão para Adicionar Novo Cliente */}
            <Button label="Novo Cliente" icon="pi pi-plus" className="p-button-success mb-3" onClick={abrirModalCadastro} />

            <DataTable value={clientes} paginator rows={5} emptyMessage="Nenhum cliente encontrado.">
                <Column field="id" header="ID" sortable />
                <Column field="nome" header="Nome" sortable />
                <Column field="cpf" header="CPF" sortable />

                {/* 🔥 Coluna de Ações */}
                <Column
                    header="Ações"
                    body={(rowData) => (
                        <div>
                            <Button
                                label="Editar"
                                icon="pi pi-pencil"
                                className="p-button-warning p-mr-2"
                                onClick={() => editarCliente(rowData)}
                            />
                            <Button
                                label="Excluir"
                                icon="pi pi-trash"
                                className="p-button-danger"
                                onClick={() => excluirCliente(rowData.id)}
                            />
                        </div>
                    )}
                />
            </DataTable>

            {/* 🔥 Dialog para edição e cadastro */}
            <Dialog visible={dialogVisible} onHide={() => setDialogVisible(false)} header={clienteSelecionado?.id ? "Editar Cliente" : "Novo Cliente"} modal>
                <div className="p-fluid">
                    <label htmlFor="nome">Nome</label>
                    <InputText id="nome" value={clienteSelecionado?.nome || ""} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, nome: e.target.value })} />

                    <label htmlFor="cpf" className="mt-2">CPF</label>
                    <InputText id="cpf" value={clienteSelecionado?.cpf || ""} onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, cpf: e.target.value })} />
                </div>
                <div className="p-d-flex p-jc-end mt-3">
                    <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={salvarCliente} />
                </div>
            </Dialog>
        </div>
    );
};

export default ListaClientes;

