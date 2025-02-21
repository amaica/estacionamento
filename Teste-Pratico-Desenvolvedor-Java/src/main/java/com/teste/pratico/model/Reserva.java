package com.teste.pratico.model;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vaga_id", nullable = false)
    private ParkingSpot vaga;
    private ParkingSpotStatus status;
    @ManyToOne
     @JsonBackReference
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private BigDecimal valorTotal;
    private boolean encerrada;
    public void setId(Long id) {
        this.id = id;
    }
    public void setVaga(ParkingSpot vaga) {
        this.vaga = vaga;
    }
    public void setDataInicio(LocalDateTime dataInicio) {
        this.dataInicio = dataInicio;
    }
    public void setDataFim(LocalDateTime dataFim) {
        this.dataFim = dataFim;
    }

    public Long getId() {
        return id;
    }
    public ParkingSpot getVaga() {
        return vaga;
    }
    public ParkingSpotStatus getStatus() {
        return status;
    }
    public void setStatus(ParkingSpotStatus status) {
        this.status = status;
    }
    public LocalDateTime getDataInicio() {
        return dataInicio;
    }
    public LocalDateTime getDataFim() {
        return dataFim;
    }
   
    public boolean isEncerrada() {
        return encerrada;
    }
    public void setEncerrada(boolean encerrada) {
        this.encerrada = encerrada;
    }
    public BigDecimal getValorTotal() {
        return valorTotal;
    }
    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
    public Cliente getCliente() {
        return cliente;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
   
}
