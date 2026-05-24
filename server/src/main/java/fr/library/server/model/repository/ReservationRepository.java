package fr.library.server.model.repository;

import fr.library.server.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser_Id(Long userId);
    List<Reservation> findByOuvrage_IdOuvrage(Long ouvrageId);
}
