package pl.pollub.rental_listings.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pollub.rental_listings.model.Listing;

import java.util.List;

/**
 * Database access for listings. Basic CRUD methods are provided by JpaRepository.
 */
public interface ListingRepository extends JpaRepository<Listing, Long> {

    /** Finds listings in the given city, ignoring letter case. */
    List<Listing> findByCityIgnoreCase(String city);
}