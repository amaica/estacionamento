package com.teste.pratico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teste.pratico.model.ParkingSpot;
import com.teste.pratico.model.ParkingSpotStatus;

import java.util.List;

@Repository
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
    List<ParkingSpot> findByStatus(ParkingSpotStatus status);
}