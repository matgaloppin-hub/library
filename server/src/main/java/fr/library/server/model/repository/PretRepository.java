package fr.library.server.model.repository;

import fr.library.server.model.Pret;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PretRepository extends JpaRepository<Pret, Long> {
    List<Pret> findByUser_Id(Long userId);
    List<Pret> findByOuvrage_IdOuvrage(Long ouvrageId);
    // Prêts en cours (pas encore rendus)
    List<Pret> findByDateRetourIsNull();
    boolean existsByOuvrage_IdOuvrageAndDateRetourIsNull(Long ouvrageId);
}
