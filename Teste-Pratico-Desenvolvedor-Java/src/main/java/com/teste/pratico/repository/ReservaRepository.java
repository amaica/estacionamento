package com.teste.pratico.repository;


import com.teste.pratico.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByEncerradaFalse(); // Buscar reservas ativas
}
