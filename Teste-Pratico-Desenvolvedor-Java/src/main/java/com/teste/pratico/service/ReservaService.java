package com.teste.pratico.service;


import com.teste.pratico.model.Cliente;
import com.teste.pratico.model.ParkingSpot;
import com.teste.pratico.model.ParkingSpotStatus;
import com.teste.pratico.model.Reserva;
import com.teste.pratico.repository.ClienteRepository;
import com.teste.pratico.repository.ParkingSpotRepository;
import com.teste.pratico.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ParkingSpotRepository vagaRepository;

  @Autowired
    private ClienteRepository clienteRepository;

    public Reserva reservarVaga(Long vagaId, String cpfCliente) {
        ParkingSpot vaga = vagaRepository.findById(vagaId)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

        if (vaga.getStatus() != ParkingSpotStatus.DISPONIVEL) {
            throw new RuntimeException("A vaga já está ocupada ou reservada.");
        }

        Cliente cliente = clienteRepository.findByCpf(cpfCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));

        Reserva reserva = new Reserva();
        reserva.setVaga(vaga);
        reserva.setCliente(cliente);
        reserva.setDataInicio(LocalDateTime.now());

        vaga.setStatus(ParkingSpotStatus.RESERVADA);
        vagaRepository.save(vaga);

        return reservaRepository.save(reserva);
    }
    
    public Reserva encerrarReserva(Long reservaId) {
        // Buscar a reserva no banco de dados
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
    
        // Verificar se já foi encerrada
        if (reserva.getDataFim() != null) {
            throw new IllegalStateException("Esta reserva já foi encerrada.");
        }
    
        // Definir a data/hora atual como fim da locação
        LocalDateTime dataFim = LocalDateTime.now();
        reserva.setDataFim(dataFim);
    
        // Garantir que valorPorHora não seja nulo
        if (reserva.getVaga().getValorPorHora() == null) {
            throw new RuntimeException("O valor por hora da vaga está indefinido.");
        }
    
        // Calcular o tempo total da reserva em horas
        Duration duracao = Duration.between(reserva.getDataInicio(), dataFim);
        long horas = Math.max(1, duracao.toMinutes() / 60); // Considera no mínimo 1 hora
    
        // Calcular valor total com BigDecimal
        BigDecimal valorPorHora = reserva.getVaga().getValorPorHora();
        BigDecimal valorTotal = valorPorHora.multiply(BigDecimal.valueOf(horas));
        reserva.setValorTotal(valorTotal);
    
        // Atualizar status da vaga para DISPONÍVEL
        ParkingSpot vaga = reserva.getVaga();
        vaga.setStatus(ParkingSpotStatus.DISPONIVEL);  // <-- Alterado para DISPONIVEL ao encerrar
        vagaRepository.save(vaga);
    
        // Salvar e retornar a reserva encerrada
        return reservaRepository.save(reserva);
    }
    
    

    public List<Reserva> listarReservasAtivas() {
        return reservaRepository.findByEncerradaFalse();
    }
}
