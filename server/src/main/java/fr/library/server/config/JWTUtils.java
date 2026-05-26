package fr.library.server.config;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import fr.library.server.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtils {

    // Utilise une clé secrète forte (normalement stockée dans application.properties)
    /*private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final int jwtExpirationMs = 86400000; // 24 heures

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key)
                .compact();
    }*/

    // Utilise une clé secrète forte (normalement stockée dans application.properties)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final int jwtExpirationMs = 86400000; // 24 heures

    public String generateToken(User user) {  // ← User au lieu de String email
        return Jwts.builder()
            .subject(user.getEmail())         // ← on extrait l'email depuis user
            .claim("role", user.getRole().name()) // ← ajout du rôle dans le payload
            .issuedAt(new Date())
            .expiration(new Date(new Date().getTime() + jwtExpirationMs))
            .signWith(key)
            .compact();
    }

    

    public String extractEmail(String token) {
    return Jwts.parser()
        .verifyWith((SecretKey) key)
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
    }

    public String extractRole(String token) {
        return Jwts.parser()
            .verifyWith((SecretKey) key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .get("role", String.class);
    }
}