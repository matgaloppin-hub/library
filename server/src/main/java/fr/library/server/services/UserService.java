package fr.library.server.services;

import fr.library.server.model.User;
import fr.library.server.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(User user) {

        // Email already exist
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("This email is already in use!");
        }

        // TODO later: Hash the password here before saving
        return userRepository.save(user);
    }
}