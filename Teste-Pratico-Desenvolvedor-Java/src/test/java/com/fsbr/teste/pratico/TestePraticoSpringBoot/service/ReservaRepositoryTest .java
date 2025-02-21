package com.teste.pratico.service;

@SpringBootTest
@Transactional
public class ReservaRepositoryTest {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ParkingSpotRepository vagaRepository;

    @Test
    void deveBuscarReservasPorStatus() {
        ParkingSpot vaga = new ParkingSpot();
        vaga.setNumero("B2");
        vaga.setStatus(ParkingSpotStatus.RESERVADA);
        vagaRepository.save(vaga);

        Reserva reserva = new Reserva();
        reserva.setVaga(vaga);
        reserva.setDataInicio(LocalDateTime.now());
        reservaRepository.save(reserva);

        List<Reserva> reservas = reservaRepository.findByVaga_Status(ParkingSpotStatus.RESERVADA);
        assertFalse(reservas.isEmpty());
    }
}
