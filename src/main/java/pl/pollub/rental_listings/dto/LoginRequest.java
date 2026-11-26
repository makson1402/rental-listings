package pl.pollub.rental_listings.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/** Credentials sent by the client to obtain a token. */
public record LoginRequest(
        @NotBlank @Email String email,
        @NotBlank String password
) {
}