package pl.pollub.rental_listings.model;

/**
 * Roles of registered users.
 * USER     - looks for an apartment.
 * LANDLORD - apartment owner who publishes listings.
 */
public enum Role {
    USER,
    LANDLORD
}