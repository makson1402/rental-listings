package pl.pollub.rental_listings.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pl.pollub.rental_listings.model.Role;

/** Data required to create a new account. */
public record RegisterRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, message = "Password must have at least 8 characters") String password,
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank String phone,
        @NotNull Role role
) {
}