package pl.pollub.rental_listings.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.pollub.rental_listings.model.User;
import pl.pollub.rental_listings.repository.UserRepository;
import pl.pollub.rental_listings.security.CurrentUserService;

/**
 * Endpoints for the account of the logged-in user.
 * New accounts are created through /api/auth/register.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;

    @GetMapping("/me")
    public User getCurrentUser() {
        return currentUserService.getCurrentUser();
    }

    /** Deletes the account together with its listings and photos. */
    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCurrentUser() {
        userRepository.delete(currentUserService.getCurrentUser());
    }
}