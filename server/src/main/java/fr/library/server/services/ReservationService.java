package fr.library.server.services;

import fr.library.server.model.Ouvrage;
import fr.library.server.model.Reservation;
import fr.library.server.model.User;
import fr.library.server.model.repository.OuvrageRepository;
import fr.library.server.model.repository.ReservationRepository;
import fr.library.server.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final OuvrageRepository ouvrageRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));
    }

    public List<Reservation> getReservationsByUser(Long userId) {
        return reservationRepository.findByUser_Id(userId);
    }

    public List<Reservation> getReservationsByOuvrage(Long ouvrageId) {
        return reservationRepository.findByOuvrage_IdOuvrage(ouvrageId);
    }

    public Reservation createReservation(Long idUser, Long idOuvrage) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Ouvrage ouvrage = ouvrageRepository.findById(idOuvrage)
                .orElseThrow(() -> new RuntimeException("Ouvrage introuvable"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setOuvrage(ouvrage);
        reservation.setDateReservation(LocalDate.now());

        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long id) {
        if (!reservationRepository.existsById(id))
            throw new RuntimeException("Réservation introuvable");
        reservationRepository.deleteById(id);
    }
}
