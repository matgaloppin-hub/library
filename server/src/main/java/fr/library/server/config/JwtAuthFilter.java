package fr.library.server.config;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Lire le cookie "token"
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        // 2. Si pas de token → on laisse passer (Spring Security bloquera si route protégée)
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Vérifier la signature et extraire les infos
        try {
            String email = jwtUtils.extractEmail(token);
            String role = jwtUtils.extractRole(token);

            // 4. Dire à Spring Security qui est connecté
            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_" + role)) // "ROLE_USER" ou "ROLE_ADMIN"
                );
            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e) {
            // Token invalide ou expiré, on laisse Spring Security gérer
        }

        filterChain.doFilter(request, response);
    }
}