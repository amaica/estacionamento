package com.teste.pratico.controller;

import com.teste.pratico.model.Reserva;
import com.teste.pratico.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService service;

    @PostMapping("/{vagaId}/cliente/{cpf}")
    public ResponseEntity<Reserva> reservarVaga(@PathVariable Long vagaId, @PathVariable String cpf) {
        try {
            return ResponseEntity.ok(service.reservarVaga(vagaId, cpf));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("/{reservaId}/encerrar")
    public ResponseEntity<?> encerrarReserva(@PathVariable Long reservaId) {
        try {
            Reserva reservaEncerrada = service.encerrarReserva(reservaId);
            return ResponseEntity.ok(reservaEncerrada);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Erro ao processar a requisição."));
        }
    }
    

    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservasAtivas() {
        return ResponseEntity.ok(service.listarReservasAtivas());
    }
}
