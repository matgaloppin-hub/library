package fr.library.server.controller;

import fr.library.server.model.Pret;
import fr.library.server.services.PretService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prets")
@RequiredArgsConstructor
public class PretController {

    private final PretService pretService;

    // GET /api/prets  — ADMIN : tous les prêts
    @GetMapping
    public ResponseEntity<List<Pret>> getAllPrets() {
        return ResponseEntity.ok(pretService.getAllPrets());
    }

    // GET /api/prets/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Pret> getPretById(@PathVariable Long id) {
        return ResponseEntity.ok(pretService.getPretById(id));
    }

    // GET /api/prets/en-cours  — ADMIN : prêts non rendus
    @GetMapping("/en-cours")
    public ResponseEntity<List<Pret>> getPretsEnCours() {
        return ResponseEntity.ok(pretService.getPretsEnCours());
    }

    // GET /api/prets/user/{idUser}  — prêts d'un utilisateur
    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<Pret>> getPretsByUser(@PathVariable Long idUser) {
        return ResponseEntity.ok(pretService.getPretsByUser(idUser));
    }

    // POST /api/prets?idUser=1&idOuvrage=2  — ADMIN : enregistrer un prêt
    @PostMapping
    public ResponseEntity<Pret> createPret(@RequestParam Long idUser,
                                            @RequestParam Long idOuvrage) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pretService.createPret(idUser, idOuvrage));
    }

    // PUT /api/prets/{id}/retour  — ADMIN : enregistrer le retour
    @PutMapping("/{id}/retour")
    public ResponseEntity<Pret> enregistrerRetour(@PathVariable Long id) {
        return ResponseEntity.ok(pretService.enregistrerRetour(id));
    }

    // DELETE /api/prets/{id}  — ADMIN seulement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePret(@PathVariable Long id) {
        pretService.deletePret(id);
        return ResponseEntity.noContent().build();
    }
}
