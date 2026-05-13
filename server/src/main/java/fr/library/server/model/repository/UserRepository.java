package fr.library.server.model.repository;

import fr.library.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // N'oublie pas l'import

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    
    // Ajoute ceci :
    Optional<User> findByEmail(String email);
}