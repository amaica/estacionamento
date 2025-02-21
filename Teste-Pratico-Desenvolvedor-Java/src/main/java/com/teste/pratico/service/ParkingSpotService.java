package com.teste.pratico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.teste.pratico.model.ParkingSpot;
import com.teste.pratico.model.ParkingSpotStatus;
import com.teste.pratico.repository.ParkingSpotRepository;

@Service
public class ParkingSpotService {
    @Autowired
    private ParkingSpotRepository repository;

    public ParkingSpot save(ParkingSpot spot) {
        return repository.save(spot);
    }

    public List<ParkingSpot> findAvailableSpots() {
        return repository.findByStatus(ParkingSpotStatus.DISPONIVEL);
    }
    public List<ParkingSpot> listarTodas() {
        return repository.findAll();
    }

  
    
}
