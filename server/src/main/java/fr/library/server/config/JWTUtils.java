package fr.library.server.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JWTUtils {

    // Utilise une clé secrète forte (normalement stockée dans application.properties)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final int jwtExpirationMs = 86400000; // 24 heures

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key)
                .compact();
    }
}