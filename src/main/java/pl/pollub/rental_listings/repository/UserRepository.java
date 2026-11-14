package pl.pollub.rental_listings.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pollub.rental_listings.model.Role;
import pl.pollub.rental_listings.model.User;

import java.util.List;
import java.util.Optional;

/**
 * Database access for users. Basic CRUD methods are provided by JpaRepository.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);

    /** Checks whether the email is already used by any account. */
    boolean existsByEmail(String email);

    /** Checks whether the email is used by an account other than the given one. */
    boolean existsByEmailAndIdNot(String email, Long id);
}