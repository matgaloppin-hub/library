package fr.library.server.services;

import fr.library.server.model.Ouvrage;
import fr.library.server.model.Pret;
import fr.library.server.model.User;
import fr.library.server.model.repository.OuvrageRepository;
import fr.library.server.model.repository.PretRepository;
import fr.library.server.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PretService {

    private final PretRepository pretRepository;
    private final UserRepository userRepository;
    private final OuvrageRepository ouvrageRepository;

    public List<Pret> getAllPrets() {
        return pretRepository.findAll();
    }

    public Pret getPretById(Long id) {
        return pretRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prêt introuvable"));
    }

    public List<Pret> getPretsByUser(Long userId) {
        return pretRepository.findByUser_Id(userId);
    }

    public List<Pret> getPretsEnCours() {
        return pretRepository.findByDateRetourIsNull();
    }

    public Pret createPret(Long idUser, Long idOuvrage) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Ouvrage ouvrage = ouvrageRepository.findById(idOuvrage)
                .orElseThrow(() -> new RuntimeException("Ouvrage introuvable"));

        if (!ouvrage.getDisponible()) {
            throw new RuntimeException("L'ouvrage n'est pas disponible");
        }

        // Marquer l'ouvrage comme indisponible
        ouvrage.setDisponible(false);
        ouvrageRepository.save(ouvrage);

        Pret pret = new Pret();
        pret.setUser(user);
        pret.setOuvrage(ouvrage);
        pret.setDatePret(LocalDate.now());
        pret.setDateRetour(null);

        return pretRepository.save(pret);
    }

    public Pret enregistrerRetour(Long idPret) {
        Pret pret = getPretById(idPret);

        if (pret.getDateRetour() != null) {
            throw new RuntimeException("Ce prêt a déjà été retourné");
        }

        pret.setDateRetour(LocalDate.now());

        // Remettre l'ouvrage disponible
        Ouvrage ouvrage = pret.getOuvrage();
        ouvrage.setDisponible(true);
        ouvrageRepository.save(ouvrage);

        return pretRepository.save(pret);
    }

    public void deletePret(Long id) {
        if (!pretRepository.existsById(id))
            throw new RuntimeException("Prêt introuvable");
        pretRepository.deleteById(id);
    }
}
