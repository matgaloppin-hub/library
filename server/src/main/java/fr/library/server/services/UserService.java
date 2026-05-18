package fr.library.server.services;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder; // Vérifie bien que le nom de classe est exactement JWTUtils
import org.springframework.stereotype.Service;

import fr.library.server.config.JWTUtils;
import fr.library.server.dto.LoginResponse;
import fr.library.server.model.Role;
import fr.library.server.model.User;
import fr.library.server.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;

    public User createUser(User user) {
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /*public String login(String email, String password) {
        // On cherche l'utilisateur (suppose que tu as findByEmail dans ton repo)
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // On vérifie le mot de passe
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 2. UTILISE L'INSTANCE INJECTÉE (minuscule) et non la CLASSE (Majuscule)
        return jwtUtils.generateToken(email); 
    }*/

    public LoginResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new RuntimeException("Mot de passe incorrect");

        String token = jwtUtils.generateToken(user);
        return new LoginResponse(token, user.getRole().name());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id, String emailConnecte) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!user.getEmail().equals(emailConnecte))
            throw new AccessDeniedException("Accès interdit");

        return user;
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id))
            throw new RuntimeException("Utilisateur introuvable");
        userRepository.deleteById(id);
    }
}