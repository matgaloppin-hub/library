package fr.library.server.services;

import fr.library.server.config.JWTUtils; // Vérifie bien que le nom de classe est exactement JWTUtils
import fr.library.server.model.User;
import fr.library.server.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("This email is already in use!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String login(String email, String password) {
        // On cherche l'utilisateur (suppose que tu as findByEmail dans ton repo)
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // On vérifie le mot de passe
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 2. UTILISE L'INSTANCE INJECTÉE (minuscule) et non la CLASSE (Majuscule)
        return jwtUtils.generateToken(email); 
    }
}