package pl.pollub.rental_listings.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Apartment rental listing created by a landlord.
 */
@Entity
@Table(name = "listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String city;

    @NotBlank
    private String address;

    @Min(1)
    private int rooms;

    /** Floor area in square meters. */
    @Positive
    private double area;

    /** Monthly rent in PLN. */
    @Positive
    private int price;

    private boolean parking;

    @Column(length = 2000)
    private String description;

    // Landlord's contact details
    @NotBlank
    private String contactName;

    @NotBlank
    private String contactPhone;

    @Email
    private String contactEmail;
}