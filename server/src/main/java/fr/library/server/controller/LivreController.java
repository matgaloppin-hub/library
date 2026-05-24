package fr.library.server.controller;

import fr.library.server.model.Livre;
import fr.library.server.services.LivreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livres")
@RequiredArgsConstructor
public class LivreController {

    private final LivreService livreService;

    // GET /api/livres  — liste tous les livres (accessible à tous les authentifiés)
    @GetMapping
    public ResponseEntity<List<Livre>> getAllLivres() {
        return ResponseEntity.ok(livreService.getAllLivres());
    }

    // GET /api/livres/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Livre> getLivreById(@PathVariable Long id) {
        return ResponseEntity.ok(livreService.getLivreById(id));
    }

    // GET /api/livres/recherche?titre=...
    @GetMapping("/recherche")
    public ResponseEntity<List<Livre>> rechercher(
            @RequestParam(required = false) String titre,
            @RequestParam(required = false) String auteur,
            @RequestParam(required = false) String genre) {

        if (titre != null)  return ResponseEntity.ok(livreService.rechercherParTitre(titre));
        if (auteur != null) return ResponseEntity.ok(livreService.rechercherParAuteur(auteur));
        if (genre != null)  return ResponseEntity.ok(livreService.rechercherParGenre(genre));

        return ResponseEntity.ok(livreService.getAllLivres());
    }

    // POST /api/livres  — ADMIN seulement (géré par SecurityConfig)
    @PostMapping
    public ResponseEntity<Livre> createLivre(@RequestBody @Valid Livre livre) {
        return ResponseEntity.status(HttpStatus.CREATED).body(livreService.createLivre(livre));
    }

    // PUT /api/livres/{id}  — ADMIN seulement
    @PutMapping("/{id}")
    public ResponseEntity<Livre> updateLivre(@PathVariable Long id, @RequestBody @Valid Livre livre) {
        return ResponseEntity.ok(livreService.updateLivre(id, livre));
    }

    // DELETE /api/livres/{id}  — ADMIN seulement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivre(@PathVariable Long id) {
        livreService.deleteLivre(id);
        return ResponseEntity.noContent().build();
    }
}
