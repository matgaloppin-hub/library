package fr.library.server.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "prets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pret {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPret;

    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "idOuvrage", nullable = false)
    private Ouvrage ouvrage;

    @NotNull(message = "La date de prêt est obligatoire")
    private LocalDate datePret;

    // NULL tant que le livre n'est pas rendu
    private LocalDate dateRetour;
}
