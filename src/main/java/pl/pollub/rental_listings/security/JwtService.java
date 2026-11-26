package pl.pollub.rental_listings.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import pl.pollub.rental_listings.model.User;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

/**
 * Issues and reads signed JWT access tokens.
 * The token subject is the user's email; the role is stored as a separate claim.
 */
@Service
public class JwtService {

    private static final String ROLE_CLAIM = "role";

    private final SecretKey signingKey;
    private final Duration tokenLifetime;

    public JwtService(JwtProperties jwtProperties) {
        this.signingKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtProperties.secret()));
        this.tokenLifetime = jwtProperties.expiration();
    }

    /** Creates a signed token for the given user. */
    public String generateToken(User user) {
        Instant issuedAt = Instant.now();
        return Jwts.builder()
                .subject(user.getEmail())
                .claim(ROLE_CLAIM, user.getRole().name())
                .issuedAt(Date.from(issuedAt))
                .expiration(Date.from(issuedAt.plus(tokenLifetime)))
                .signWith(signingKey)
                .compact();
    }

    /**
     * Returns the email stored in the token.
     *
     * @throws io.jsonwebtoken.JwtException if the token is malformed, expired or has an invalid signature
     */
    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}