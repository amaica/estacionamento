package com.teste.pratico.service;

import com.teste.pratico.model.Reserva;
import com.teste.pratico.model.ParkingSpot;
import com.teste.pratico.model.ParkingSpotStatus;
import com.teste.pratico.repository.ReservaRepository;
import com.teste.pratico.repository.ParkingSpotRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservaServiceTest {

    @InjectMocks
    private ReservaService reservaService;

    @Mock
    private ReservaRepository reservaRepository;

    @Mock
    private ParkingSpotRepository vagaRepository;

    private ParkingSpot vaga;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        vaga = new ParkingSpot();
        vaga.setId(1L);
        vaga.setNumero("A1");
        vaga.setStatus(ParkingSpotStatus.DISPONIVEL);
    }

    @Test
    void deveCriarReservaComSucesso() {
        when(vagaRepository.findById(1L)).thenReturn(Optional.of(vaga));

        Reserva reservaCriada = reservaService.reservarVaga(1L);

        assertNotNull(reservaCriada);
        assertEquals(ParkingSpotStatus.RESERVADA, vaga.getStatus());
        verify(reservaRepository, times(1)).save(any(Reserva.class));
    }

    @Test
    void naoDeveReservarVagaJaOcupada() {
        vaga.setStatus(ParkingSpotStatus.OCUPADA);
        when(vagaRepository.findById(1L)).thenReturn(Optional.of(vaga));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            reservaService.reservarVaga(1L);
        });

        assertEquals("A vaga já está ocupada ou reservada.", exception.getMessage());
    }

    @Test
    void deveEncerrarReservaComSucesso() {
        Reserva reserva = new Reserva();
        reserva.setId(1L);
        reserva.setDataInicio(LocalDateTime.now().minusHours(2));
        reserva.setVaga(vaga);
    
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(reserva));
    
        Reserva reservaEncerrada = reservaService.encerrarReserva(1L);
    
        assertNotNull(reservaEncerrada.getDataFim());
        assertEquals(ParkingSpotStatus.DISPONIVEL, vaga.getStatus());
        verify(reservaRepository, times(1)).save(reserva);
    }
    
    @Test
    void naoDeveEncerrarReservaJaEncerrada() {
        Reserva reserva = new Reserva();
        reserva.setId(1L);
        reserva.setDataInicio(LocalDateTime.now().minusHours(2));
        reserva.setDataFim(LocalDateTime.now().minusMinutes(30));
        reserva.setVaga(vaga);
    
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(reserva));
    
        Exception exception = assertThrows(RuntimeException.class, () -> {
            reservaService.encerrarReserva(1L);
        });
    
        assertEquals("Esta reserva já foi encerrada.", exception.getMessage());
    }
    
}
