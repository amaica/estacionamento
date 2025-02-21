import React, { useState, useRef } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const CadastroVaga = () => {
    const [numero, setNumero] = useState("");
    const [tipo, setTipo] = useState("");
    const [valorPorHora, setValorPorHora] = useState(null);
    const toast = useRef(null);

    const tiposVaga = [
        { label: "Comum", value: "COMUM" },
        { label: "VIP", value: "VIP" },
        { label: "Executiva", value: "EXECUTIVA" }
    ];

const handleCadastro = async (event) => {
    event.preventDefault();

    const vaga = {
        numero,
        tipo,
        valorPorHora: parseFloat(valorPorHora), // Converte para número
        status: "DISPONIVEL"
    };

    try {
        await axios.post("http://localhost:9292/api/vagas", vaga, {
            headers: { "Content-Type": "application/json" }
        });

        toast.current.show({ severity: "success", summary: "Sucesso", detail: "Vaga cadastrada!", life: 3000 });

        setNumero("");
        setTipo("");
        setValorPorHora("");
    } catch (error) {
        console.error("Erro no cadastro:", error.response ? error.response.data : error.message);
        toast.current.show({ severity: "error", summary: "Erro", detail: "Falha ao cadastrar vaga", life: 3000 });
    }
};

    return (
        <div className="p-d-flex p-jc-center p-ai-center p-mt-5">
            <Toast ref={toast} />
            <Card className="p-shadow-3 p-p-4" style={{ width: "400px" }}>
                <h2 className="p-text-center">Cadastrar Nova Vaga</h2>
                <Divider />
                <div className="p-fluid">
                    <div className="p-field">
                        <label>Número</label>
                        <InputText value={numero} onChange={(e) => setNumero(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label>Tipo</label>
                        <Dropdown value={tipo} options={tiposVaga} onChange={(e) => setTipo(e.value)} placeholder="Selecione o tipo" />
                    </div>
                    <div className="p-field">
                        <label>Valor por Hora</label>
                        <InputNumber value={valorPorHora} onValueChange={(e) => setValorPorHora(e.value)} mode="currency" currency="BRL" locale="pt-BR" />
                    </div>
                    <Button label="Cadastrar" icon="pi pi-check" className="p-button-success" onClick={handleCadastro} />
                </div>
            </Card>
        </div>
    );
};

export default CadastroVaga;

