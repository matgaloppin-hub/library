package fr.library.server.services;

import fr.library.server.model.Livre;
import fr.library.server.model.Ouvrage;
import fr.library.server.model.repository.LivreRepository;
import fr.library.server.model.repository.OuvrageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OuvrageService {

    private final OuvrageRepository ouvrageRepository;
    private final LivreRepository livreRepository;

    public List<Ouvrage> getAllOuvrages() {
        return ouvrageRepository.findAll();
    }

    public Ouvrage getOuvrageById(Long id) {
        return ouvrageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ouvrage introuvable"));
    }

    public List<Ouvrage> getOuvragesDisponibles() {
        return ouvrageRepository.findByDisponible(true);
    }

    public List<Ouvrage> getOuvragesByLivre(Long idLivre) {
        return ouvrageRepository.findByLivre_IdLivre(idLivre);
    }

    public Ouvrage createOuvrage(Long idLivre, Ouvrage ouvrage) {
        Livre livre = livreRepository.findById(idLivre)
                .orElseThrow(() -> new RuntimeException("Livre introuvable"));
        ouvrage.setLivre(livre);
        ouvrage.setDisponible(true);
        return ouvrageRepository.save(ouvrage);
    }

    public Ouvrage updateOuvrage(Long id, Ouvrage ouvrageModifie) {
        Ouvrage existing = getOuvrageById(id);
        existing.setEmplacement(ouvrageModifie.getEmplacement());
        existing.setDisponible(ouvrageModifie.getDisponible());
        return ouvrageRepository.save(existing);
    }

    public void deleteOuvrage(Long id) {
        if (!ouvrageRepository.existsById(id))
            throw new RuntimeException("Ouvrage introuvable");
        ouvrageRepository.deleteById(id);
    }
}
