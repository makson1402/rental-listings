package pl.pollub.rental_listings.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import pl.pollub.rental_listings.model.Listing;
import pl.pollub.rental_listings.model.User;
import pl.pollub.rental_listings.repository.UserRepository;

import java.util.Optional;

/**
 * Gives access to the user who sent the current request.
 */
@Component
@RequiredArgsConstructor
public class CurrentUserService {

    private final UserRepository userRepository;

    /** Returns the logged-in user, or an empty result for anonymous visitors. */
    public Optional<User> findCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        return userRepository.findByEmail(authentication.getName());
    }

    /** Returns the logged-in user or responds with 401 Unauthorized. */
    public User getCurrentUser() {
        return findCurrentUser()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required"));
    }

    /** Responds with 403 Forbidden unless the logged-in user owns the listing. */
    public void checkIsOwner(Listing listing) {
        User currentUser = getCurrentUser();
        if (!listing.getOwner().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only manage your own listings");
        }
    }
}