package fr.library.server.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReservation;

    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "idOuvrage", nullable = false)
    private Ouvrage ouvrage;

    @NotNull(message = "La date de réservation est obligatoire")
    private LocalDate dateReservation;
}
