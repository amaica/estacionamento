package com.teste.pratico.controller;

import org.springframework.web.bind.annotation.*;

import com.teste.pratico.model.ParkingSpot;
import com.teste.pratico.service.ParkingSpotService;

import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/api/vagas")
@CrossOrigin("*") // Permite requisições do React
public class ParkingSpotController {

    @Autowired
    private final ParkingSpotService service;


    public ParkingSpotController(ParkingSpotService service) {
        this.service = service;
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<ParkingSpot>> getAvailableSpots() {
        List<ParkingSpot> availableSpots = service.findAvailableSpots();
        return ResponseEntity.ok(availableSpots);
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid ParkingSpot vaga) {
        try {
            ParkingSpot novaVaga = service.save(vaga);
            return ResponseEntity.ok(novaVaga);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar vaga: " + e.getMessage());
        }
    }


    @GetMapping
public ResponseEntity<List<ParkingSpot>> listarVagas() {
    try {
        List<ParkingSpot> vagas = service.listarTodas();
        return ResponseEntity.ok(vagas);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList());
    }
}

}
