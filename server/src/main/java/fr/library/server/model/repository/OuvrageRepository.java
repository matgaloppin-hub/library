package fr.library.server.model.repository;

import fr.library.server.model.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OuvrageRepository extends JpaRepository<Ouvrage, Long> {
    List<Ouvrage> findByLivre_IdLivre(Long idLivre);
    List<Ouvrage> findByDisponible(Boolean disponible);
}
