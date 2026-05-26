package fr.library.server.services;

import fr.library.server.model.Livre;
import fr.library.server.model.Ouvrage;
import fr.library.server.model.repository.LivreRepository;
import fr.library.server.model.repository.OuvrageRepository;
import fr.library.server.model.repository.PretRepository;
import fr.library.server.model.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivreService {

    private final LivreRepository livreRepository;
    private final OuvrageRepository ouvrageRepository;
    private final PretRepository pretRepository;
    private final ReservationRepository reservationRepository;

    public List<Livre> getAllLivres() {
        return livreRepository.findAll();
    }

    public Livre getLivreById(Long id) {
        return livreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre introuvable"));
    }

    public List<Livre> rechercherParTitre(String titre) {
        return livreRepository.findByTitreContainingIgnoreCase(titre);
    }

    public List<Livre> rechercherParAuteur(String auteur) {
        return livreRepository.findByAuteurContainingIgnoreCase(auteur);
    }

    public List<Livre> rechercherParGenre(String genre) {
        return livreRepository.findByGenreIgnoreCase(genre);
    }

    public Livre createLivre(Livre livre) {
        return livreRepository.save(livre);
    }

    public Livre updateLivre(Long id, Livre livreModifie) {
        Livre existing = getLivreById(id);
        existing.setTitre(livreModifie.getTitre());
        existing.setAuteur(livreModifie.getAuteur());
        existing.setEdition(livreModifie.getEdition());
        existing.setAnneeParution(livreModifie.getAnneeParution());
        existing.setGenre(livreModifie.getGenre());
        return livreRepository.save(existing);
    }

    /**
     * Supprime un livre et toutes ses dépendances en cascade :
     *   Livre → Ouvrages → Prêts + Réservations liés à ces ouvrages
     */
    @Transactional
    public void deleteLivre(Long id) {
        if (!livreRepository.existsById(id))
            throw new RuntimeException("Livre introuvable");

        // 1. Récupérer tous les exemplaires du livre
        List<Ouvrage> ouvrages = ouvrageRepository.findByLivre_IdLivre(id);

        for (Ouvrage ouvrage : ouvrages) {
            Long idOuvrage = ouvrage.getIdOuvrage();
            // 2. Supprimer les prêts et réservations liés à cet exemplaire
            pretRepository.deleteAll(pretRepository.findByOuvrage_IdOuvrage(idOuvrage));
            reservationRepository.deleteAll(reservationRepository.findByOuvrage_IdOuvrage(idOuvrage));
            // 3. Supprimer l'exemplaire
            ouvrageRepository.delete(ouvrage);
        }

        // 4. Supprimer le livre
        livreRepository.deleteById(id);
    }
}
