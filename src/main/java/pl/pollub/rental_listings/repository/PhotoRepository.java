package pl.pollub.rental_listings.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pollub.rental_listings.model.Photo;

import java.util.List;
import java.util.Optional;

/**
 * Database access for listing photos.
 */
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    /** Returns the photos of a listing in the order they were added. */
    List<Photo> findByListingIdOrderByIdAsc(Long listingId);

    /** Finds a photo only if it belongs to the given listing. */
    Optional<Photo> findByIdAndListingId(Long id, Long listingId);
}