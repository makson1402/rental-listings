package pl.pollub.rental_listings.dto;

import pl.pollub.rental_listings.model.Role;

/** Returned after a successful registration or login. */
public record AuthResponse(String token, Long userId, String email, String firstName, Role role) {
}