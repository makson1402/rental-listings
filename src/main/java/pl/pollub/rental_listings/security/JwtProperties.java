package pl.pollub.rental_listings.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * JWT settings bound from the "app.jwt" entries of application.properties.
 *
 * @param secret     Base64-encoded key used to sign tokens
 * @param expiration lifetime of an issued token
 */
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(String secret, Duration expiration) {
}