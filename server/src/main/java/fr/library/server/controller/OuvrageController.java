package fr.library.server.controller;

import fr.library.server.model.Ouvrage;
import fr.library.server.services.OuvrageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ouvrages")
@RequiredArgsConstructor
public class OuvrageController {

    private final OuvrageService ouvrageService;

    // GET /api/ouvrages  — liste tous les exemplaires
    @GetMapping
    public ResponseEntity<List<Ouvrage>> getAllOuvrages() {
        return ResponseEntity.ok(ouvrageService.getAllOuvrages());
    }

    // GET /api/ouvrages/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Ouvrage> getOuvrageById(@PathVariable Long id) {
        return ResponseEntity.ok(ouvrageService.getOuvrageById(id));
    }

    // GET /api/ouvrages/disponibles
    @GetMapping("/disponibles")
    public ResponseEntity<List<Ouvrage>> getDisponibles() {
        return ResponseEntity.ok(ouvrageService.getOuvragesDisponibles());
    }

    // GET /api/ouvrages/livre/{idLivre}  — tous les exemplaires d'un livre
    @GetMapping("/livre/{idLivre}")
    public ResponseEntity<List<Ouvrage>> getByLivre(@PathVariable Long idLivre) {
        return ResponseEntity.ok(ouvrageService.getOuvragesByLivre(idLivre));
    }

    // POST /api/ouvrages/livre/{idLivre}  — ADMIN : ajouter un exemplaire
    @PostMapping("/livre/{idLivre}")
    public ResponseEntity<Ouvrage> createOuvrage(@PathVariable Long idLivre,
                                                  @RequestBody Ouvrage ouvrage) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ouvrageService.createOuvrage(idLivre, ouvrage));
    }

    // PUT /api/ouvrages/{id}  — ADMIN : modifier emplacement / disponibilité
    @PutMapping("/{id}")
    public ResponseEntity<Ouvrage> updateOuvrage(@PathVariable Long id,
                                                  @RequestBody @Valid Ouvrage ouvrage) {
        return ResponseEntity.ok(ouvrageService.updateOuvrage(id, ouvrage));
    }

    // DELETE /api/ouvrages/{id}  — ADMIN seulement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOuvrage(@PathVariable Long id) {
        ouvrageService.deleteOuvrage(id);
        return ResponseEntity.noContent().build();
    }
}
