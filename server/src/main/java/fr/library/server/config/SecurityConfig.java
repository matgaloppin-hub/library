package fr.library.server.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // ← ajout
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter; // ← ajout

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // ← ajout
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Routes publiques (login / register)
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                .requestMatchers("/h2-console/**").permitAll()

                // --- Utilisateurs ---
                .requestMatchers(HttpMethod.GET, "/api/users/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/users/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/users/*/accept").hasRole("ADMIN")

                // --- Livres : lecture pour tous les connectés, écriture ADMIN ---
                .requestMatchers(HttpMethod.GET, "/api/livres/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/livres/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/livres/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/livres/**").hasRole("ADMIN")

                // --- Ouvrages : lecture pour tous, écriture ADMIN ---
                .requestMatchers(HttpMethod.GET, "/api/ouvrages/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/ouvrages/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/ouvrages/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/ouvrages/**").hasRole("ADMIN")

                // --- Prêts : gérés par l'ADMIN ---
                .requestMatchers("/api/prets/**").hasRole("ADMIN")

                // --- Réservations : un USER peut créer/voir les siennes ---
                .requestMatchers(HttpMethod.GET, "/api/reservations/user/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/reservations").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/reservations/**").authenticated()
                .requestMatchers("/api/reservations/**").hasRole("ADMIN")

                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}