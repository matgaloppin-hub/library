package fr.library.server.controller;

import fr.library.server.model.Reservation;
import fr.library.server.services.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    // GET /api/reservations  — ADMIN : toutes les réservations
    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    // GET /api/reservations/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    // GET /api/reservations/user/{idUser}  — réservations d'un utilisateur
    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<Reservation>> getByUser(@PathVariable Long idUser) {
        return ResponseEntity.ok(reservationService.getReservationsByUser(idUser));
    }

    // GET /api/reservations/ouvrage/{idOuvrage}  — réservations sur un ouvrage
    @GetMapping("/ouvrage/{idOuvrage}")
    public ResponseEntity<List<Reservation>> getByOuvrage(@PathVariable Long idOuvrage) {
        return ResponseEntity.ok(reservationService.getReservationsByOuvrage(idOuvrage));
    }

    // POST /api/reservations?idUser=1&idOuvrage=2  — créer une réservation
    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestParam Long idUser,
                                                          @RequestParam Long idOuvrage) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reservationService.createReservation(idUser, idOuvrage));
    }

    // DELETE /api/reservations/{id}  — annuler une réservation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
